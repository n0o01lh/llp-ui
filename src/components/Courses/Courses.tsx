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
import { useAddResourcesToCourse } from "@/hooks/useCourseApi";
import { Alert } from "../Alert";

export interface Course {
  id: string;
  title: string;
  description: string;
  teacher_id: number;
  resources: Array<Resource>;
}

const Courses = () => {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const { data: resources } = useListResourceByTeacher("2");
  const [saveChangesButton, setsaveChangesButton] = useState(true);
  const { mutate, isSuccess } = useAddResourcesToCourse();
  const deleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

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

  const removeResourceFromCourse = (courseId: string, resourceId: string) => {
    console.log({ courseId, resourceId });
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

  const saveChanges = (courseId: string) => {
    const resourcesIds = courses
      .find((c: Course) => c.id === courseId)
      ?.resources.map((resource: Resource) => resource.id);

    mutate({ resources: resourcesIds, course_id: 2 });
  };

  return (
    <div>
      <CoursesForm courses={courses} setCourses={setCourses} />

      <h2 className="text-2xl font-bold mb-4 dark:text-white">Courses</h2>
      <div className="space-y-4">
        {courses.map((course: Course) => (
          <Card key={course.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{course.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteCourse(course.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {course.description}
              </CardDescription>
              <h4 className="font-semibold mb-2 dark:text-white">Resources:</h4>
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
                          onClick={() =>
                            removeResourceFromCourse(course.id, resource.id)
                          }
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
        ))}
        {isSuccess && <Alert message="Changes saved" duration={5} />}
      </div>
    </div>
  );
};

export default Courses;
