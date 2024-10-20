import React, { useEffect, useState } from "react";
import {
  Trash2,
  Video,
  Headphones,
  FileText,
  Clock,
  DollarSign,
  Pen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Resource } from "./Resources";
import { useDeleteResource } from "@/hooks/useResourceApi";
import DeleteConfirmationDialog from "../Shared/DeleteConfirmationDialog";
import { Alert } from "../Alert";
import { useNavigate } from "react-router";

interface ResourcesGridProps {
  resources: Array<Resource>;
  isSuccess: boolean;
  setResources: (resources: Array<Resource>) => void;
}

const ResourcesGrid: React.FC<ResourcesGridProps> = (props) => {
  const { resources, setResources, isSuccess } = props;
  const [idToDelete, setIdToDelete] = useState<string>();
  const [titleToDelete, setTitleToDelete] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate, isSuccess: deleteSuccess } = useDeleteResource();
  const navigate = useNavigate();

  const handleDelete = () => {
    mutate(parseInt(idToDelete as string));
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (deleteSuccess) {
      setResources(resources.filter((r) => r.id !== idToDelete));
      setIsDialogOpen(false);
    }
  }, [deleteSuccess]);

  return (
    <div>
      {isSuccess ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource: Resource) => (
              <Card
                key={resource.id}
                className="relative overflow-hidden group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-12 z-10 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    navigate(`edit/${resource.id}`);
                  }}
                >
                  <Pen className="h-4 w-4" />
                  <span className="sr-only">Delete resource</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setIdToDelete(resource.id);
                    setTitleToDelete(resource.title);
                    setIsDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete resource</span>
                </Button>
                <div className="w-full aspect-video">
                  <img
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <CardTitle className="text-lg mb-2">
                    {resource.title}
                  </CardTitle>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {resource.resource_type === "video" && (
                        <Video className="h-4 w-4 text-blue-500" />
                      )}
                      {resource.resource_type === "audio" && (
                        <Headphones className="h-4 w-4 text-green-500" />
                      )}
                      {resource.resource_type === "document" && (
                        <FileText className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm font-medium">
                        {resource.resource_type}
                      </span>
                    </div>
                    {(resource.resource_type === "video" ||
                      resource.resource_type === "audio") && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{resource.duration} min</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-bold">{resource.price}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {resource.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}

      <DeleteConfirmationDialog
        message={`This action will remove the resource "${titleToDelete}"
            permanently. This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />

      {deleteSuccess && <Alert message="Resource Deleted" duration={5} />}
    </div>
  );
};

export default ResourcesGrid;
