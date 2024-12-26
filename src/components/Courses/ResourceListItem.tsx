import type { Identifier, XYCoord } from "dnd-core";

import {
  BookMarked,
  FileText,
  Headphones,
  SquareActivity,
  Trash2,
  Video,
} from "lucide-react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Resource } from "../Resources/Resources";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

interface ResourceListItemProps {
  courseId: string;
  resource: Resource;
  setIsDialogOpen: (value: boolean) => void;
  setCourseIdFromDelete: (value: string) => void;
  setResourceIdToDelete: (value: string) => void;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const ResourceListItem: React.FC<ResourceListItemProps> = (props) => {
  const {
    resource,
    courseId,
    setIsDialogOpen,
    setCourseIdFromDelete,
    setResourceIdToDelete,
    moveItem,
    index,
  } = props;

  interface DragItem {
    index: number;
    id: string;
    type: string;
  }

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "ResourceListItem",
    collect(monitor: DropTargetMonitor<DragItem, void>) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ResourceListItem",
    item: () => {
      const id = resource.id;
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
      data-handler-id={handlerId}
    >
      <div className="flex flex-1 items-center space-x-2">
        {resource.resource_type === "video" && (
          <Video className="h-4 w-4 text-blue-500" />
        )}
        {resource.resource_type === "audio" && (
          <Headphones className="h-4 w-4 text-green-500" />
        )}
        {resource.resource_type === "document" && (
          <FileText className="h-4 w-4 text-yellow-500" />
        )}
        {resource.resource_type === "reading" && (
          <BookMarked className="h-4 w-4 text-cyan-500" />
        )}
        {resource.resource_type === "quiz" && (
          <SquareActivity className="h-4 w-4 text-indigo-500" />
        )}
        <span className="font-medium dark:text-white">{resource.title}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm dark:text-gray-300">${resource.price}</span>
        {(resource.resource_type === "video" ||
          resource.resource_type === "audio") && (
          <span className="text-sm dark:text-gray-300">
            {resource.duration} min
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsDialogOpen(true);
            setCourseIdFromDelete(courseId);
            setResourceIdToDelete(resource.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResourceListItem;
