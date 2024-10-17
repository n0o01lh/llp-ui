import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Trash2, Video, Headphones, FileText, Save } from "lucide-react";
import { Resource } from "../Resources/Resources";
import { useListResourceByTeacher } from "@/hooks/useResourceApi";
import CoursesForm from "./CoursesForm";
import {
  useAddResourcesToCourse,
  useCourseListByTeacher,
  useDeleteCourse,
  useDeleteResourceFromCourse,
} from "@/hooks/useCourseApi";
import { Alert } from "../Alert";
import DeleteConfirmationDialog from "../Shared/DeleteConfirmationDialog";

export interface Course {
  id: string;
  title: string;
  description: string;
  teacher_id: number;
  resources: Array<Resource>;
}

const Courses = () => {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const { data: resources } = useListResourceByTeacher("1");
  const [saveChangesButton, setsaveChangesButton] = useState(true);
  const { mutate, isSuccess } = useAddResourcesToCourse();
  const { data: courseList } = useCourseListByTeacher("1");
  const { mutate: deleteMutate } = useDeleteResourceFromCourse();
  const { mutate: deleteCourseMutate, isSuccess: isSuccessDeleteCourse } =
    useDeleteCourse();
  const [courseIdFromDelete, setCourseIdFromDelete] = useState("");
  const [resourceIdToDelete, setResourceIdToDelete] = useState("");
  const [courseIdToDelete, setCourseIdToDelete] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [resourcesToDelete, setResourcesToDelete] = useState<Array<string>>([]);

  const deleteCourse = () => {
    deleteCourseMutate(parseInt(courseIdToDelete));
    setIsCourseDialogOpen(false);
  };

  useEffect(() => {
    setCourses(courseList);
  }, [courseList]);

  useEffect(() => {
    if (isSuccessDeleteCourse) {
      setCourses(courses.filter((c) => c.id !== courseIdToDelete));
    }
  }, [isSuccessDeleteCourse]);

  const addResourceToCourse = (courseId: string, resourceId: number) => {
    const resource = resources.find((r: Resource) => {
      return parseInt(r.id) === resourceId;
    });

    if (resource != undefined) {
      setCourses(
        courses.map((course) =>
          course.id === courseId
            ? { ...course, resources: [...course.resources, resource] }
            : course
        )
      );
    }
    setsaveChangesButton(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setIsCourseDialogOpen(false);
  };

  const removeResourceFromCourse = () => {
    const course = courses.find((c: Course) => {
      return c.id === courseIdFromDelete;
    });

    if (course != undefined) {
      const resources = course.resources.filter(
        (r: Resource) => r.id !== resourceIdToDelete
      );

      const rToDelete = resourcesToDelete.concat(
        course.resources
          .filter((r: Resource) => r.id === resourceIdToDelete)
          .map((r: Resource) => r.id)
      );

      setResourcesToDelete(rToDelete);

      setCourses(
        courses.map((course) =>
          course.id === courseIdFromDelete
            ? { ...course, resources: resources }
            : course
        )
      );
    }
    setIsDialogOpen(false);
    //mutate(parseInt(idToDelete as string));
    setsaveChangesButton(false);
  };

  const calculateTotalPrice = (resourcesList: Array<Resource>) => {
    return resourcesList
      .reduce((total, resourceId) => {
        const resource = resources.find(
          (r: Resource) => r.id === resourceId.id
        );
        return total + (resource ? parseFloat(resource.price) || 0 : 0);
      }, 0)
      .toFixed(2);
  };

  useEffect(() => {
    if (isSuccess) {
      setsaveChangesButton(true);
    }
  }, [isSuccess]);

  const saveChanges = async (courseId: string) => {
    const resourcesIds = courses
      .find((c: Course) => c.id === courseId)
      ?.resources.map((resource: Resource) => resource.id);

    resourcesToDelete?.map(async (id: string) =>
      deleteMutate({ courseId, resourceId: id })
    );

    mutate({ resources: resourcesIds, course_id: courseId });
  };

  const getResourceNameFromId = (resourceId: string) => {
    const resource = resources?.find(
      (resource: Resource) => resource.id === resourceId
    );
    return resource?.title;
  };

  const getCourseNameFromId = (courseId: string) => {
    const course = courses?.find((course: Course) => course.id === courseId);
    return course?.title;
  };

  return (
    <div>
      <CoursesForm courses={courses} setCourses={setCourses} />

      <h2 className="text-2xl font-bold mb-4 dark:text-white">Courses</h2>
      <div className="space-y-4">
        {courses && resources ? (
          courses.map((course: Course) => (
            <Card key={course.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{course.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsCourseDialogOpen(true);
                    setCourseIdToDelete(course.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {course.description}
                </CardDescription>
                <h4 className="font-semibold mb-2 dark:text-white">
                  Resources:
                </h4>
                <div className="space-y-2">
                  {course.resources.map((resourceInList: Resource) => {
                    const resource: Resource = resources.find(
                      (r: Resource) => r.id === resourceInList.id
                    );
                    return resource ? (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          {resource.resource_type === "video" && (
                            <Video className="h-4 w-4 text-blue-500" />
                          )}
                          {resource.resource_type === "audio" && (
                            <Headphones className="h-4 w-4 text-green-500" />
                          )}
                          {resource.resource_type === "document" && (
                            <FileText className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className="font-medium dark:text-white">
                            {resource.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm dark:text-gray-300">
                            {resource.resource_type}
                          </span>
                          <span className="text-sm dark:text-gray-300">
                            ${resource.price}
                          </span>
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
                              setCourseIdFromDelete(course.id);
                              setResourceIdToDelete(resource.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
                <Select
                  onValueChange={(value) =>
                    addResourceToCourse(course.id, parseInt(value))
                  }
                >
                  <SelectTrigger className="w-full mt-4">
                    <SelectValue placeholder="Add resource to course" />
                  </SelectTrigger>
                  <SelectContent>
                    {resources
                      .filter((r: Resource) => !course.resources.includes(r))
                      .map((resource: Resource) => (
                        <SelectItem
                          key={resource.id}
                          value={resource.id.toString()}
                        >
                          {resource.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-end w-full gap-10">
                  <span className="font-semibold dark:text-white">
                    Total Price: ${calculateTotalPrice(course.resources)}
                  </span>

                  <Button
                    disabled={saveChangesButton}
                    onClick={() => saveChanges(course.id)}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save changes
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <></>
        )}
        <DeleteConfirmationDialog
          message={`This action will remove the resource "${getResourceNameFromId(
            resourceIdToDelete
          )}"
            from this course. You must to press "Save changes" button to take effect.`}
          onConfirm={removeResourceFromCourse}
          onCancel={handleCancel}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
        />

        <DeleteConfirmationDialog
          message={`This action will remove the course "${getCourseNameFromId(
            courseIdToDelete
          )}".This action cannot be undone.`}
          onConfirm={deleteCourse}
          onCancel={handleCancel}
          isOpen={isCourseDialogOpen}
          setIsOpen={setIsCourseDialogOpen}
        />

        {isSuccess && <Alert message="Changes saved" duration={5} />}
      </div>
    </div>
  );
};

export default Courses;
