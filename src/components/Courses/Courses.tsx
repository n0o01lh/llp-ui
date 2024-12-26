import React, { useEffect, useState } from "react";
import update from "immutability-helper";
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
import { Trash2, Save, Pencil } from "lucide-react";
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
import { useNavigate } from "react-router";
import { UserStoreState, useUserStore } from "@/store/userStore";
import { jwtDecode } from "jwt-decode";
import Paginator from "../Shared/Paginator";
import ResourceListItem from "./ResourceListItem";

export interface Course {
  id: string;
  title: string;
  description: string;
  resources: Array<Resource>;
}

const Courses = () => {
  const userAuth = useUserStore((state: UserStoreState) => state.userAuth);
  const teacherId = (jwtDecode(userAuth?.token as string) as { id: number }).id;

  const [courses, setCourses] = useState<Array<Course>>([]);
  const { data: resources } = useListResourceByTeacher(
    teacherId,
    undefined,
    -1
  );
  const [saveChangesButton, setsaveChangesButton] = useState(true);
  const { mutate, isSuccess } = useAddResourcesToCourse();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: courseList, refetch } = useCourseListByTeacher(
    teacherId,
    currentPage
  );
  const { mutate: deleteMutate } = useDeleteResourceFromCourse();
  const { mutate: deleteCourseMutate, isSuccess: isSuccessDeleteCourse } =
    useDeleteCourse();
  const [courseIdFromDelete, setCourseIdFromDelete] = useState("");
  const [resourceIdToDelete, setResourceIdToDelete] = useState("");
  const [courseIdToDelete, setCourseIdToDelete] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [resourcesToDelete, setResourcesToDelete] = useState<Array<string>>([]);
  const navigate = useNavigate();

  const deleteCourse = () => {
    deleteCourseMutate(parseInt(courseIdToDelete));
    setIsCourseDialogOpen(false);
  };

  useEffect(() => {
    if (courseList) {
      setCourses(courseList.rows);
    }
  }, [courseList]);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    if (isSuccessDeleteCourse) {
      setCourses(courses.filter((c) => c.id !== courseIdToDelete));
    }
  }, [isSuccessDeleteCourse]);

  const addResourceToCourse = (courseId: string, resourceId: number) => {
    const resource = resources.rows.find((r: Resource) => {
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
        const resource = resources.rows.find(
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
      ?.resources.map((resource: Resource) => {
        return {
          resource_id: resource.id,
          order: resource.extra_fields ? resource.extra_fields.order : 0,
        };
      });

    resourcesToDelete?.map(async (id: string) =>
      deleteMutate({ courseId, resourceId: id })
    );

    mutate({ resources: resourcesIds, course_id: courseId });
  };

  const getResourceNameFromId = (resourceId: string) => {
    const resource = resources?.rows.find(
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

      {!(courses && resources) && <span>Loading...</span>}
      {courses && resources ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Courses</h2>
          <div className="space-y-4">
            {courses.map((course: Course) => (
              <Card key={course.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <div id="buttons">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigate(`edit/${course.id}`);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
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
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {course.description}
                  </CardDescription>
                  <h4 className="font-semibold mb-2 dark:text-white">
                    Resources:
                  </h4>
                  <div className="space-y-2">
                    {course.resources.map(
                      (resourceInList: Resource, index: number) => {
                        return (
                          <ResourceListItem
                            courseId={course.id}
                            resource={resourceInList}
                            setResourceIdToDelete={setResourceIdToDelete}
                            setCourseIdFromDelete={setCourseIdFromDelete}
                            setIsDialogOpen={setIsDialogOpen}
                            key={resourceInList.id}
                            index={index}
                            moveItem={(
                              dragIndex: number,
                              hoverIndex: number
                            ) => {
                              const prevResources = course.resources;
                              const updatedResources = update(prevResources, {
                                $splice: [
                                  [dragIndex, 1],
                                  [
                                    hoverIndex,
                                    0,
                                    prevResources[dragIndex] as Resource,
                                  ],
                                ],
                              });

                              updatedResources.forEach(
                                (resource, index) =>
                                  (resource.extra_fields.order = index)
                              );

                              setCourses(
                                courses.map((currentCourse) =>
                                  course.id === currentCourse.id
                                    ? {
                                        ...course,
                                        resources: updatedResources,
                                      }
                                    : currentCourse
                                )
                              );
                              setsaveChangesButton(false);
                            }}
                          />
                        );
                      }
                    )}
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
                      {resources.rows
                        .filter((r: Resource) => {
                          return !course.resources.some(
                            (resource: Resource) => resource.id === r.id
                          );
                        })
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
          </div>
          <Paginator
            currentPage={courseList?.page}
            totalPages={courseList?.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
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
  );
};

export default Courses;
