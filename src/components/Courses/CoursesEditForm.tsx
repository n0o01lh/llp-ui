import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import ValidationFields from "../ValidationFields";
import { Course } from "./Courses";
import { useEditCourse, useGetcourse } from "@/hooks/useCourseApi";
import { useNavigate, useParams } from "react-router";

const CoursesEditForm = () => {
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [course, setCourse] = useState<Course>();
  const params = useParams();
  const { data, isError, isSuccess } = useGetcourse(params["id"] as string);
  const mutation = useEditCourse();
  const navigate = useNavigate();

  const editCourse = () => {
    const fieldErrors = [];

    if (course!.title.trim() === "") {
      fieldErrors.push("Course name is required");
    }
    if (course!.description.length <= 0) {
      fieldErrors.push("Course description is required");
    }

    setErrors(fieldErrors);

    if (fieldErrors.length > 0) {
      setShowErrors(true);
    } else {
      setShowErrors(false);
      mutation.mutate(course as Course);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setCourse(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/courses");
    }
  }, [mutation.isSuccess]);

  if (isError) {
    return (
      <div>
        <h1>Error getting course to edit, please back to previous page</h1>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Create Course
        </h2>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  placeholder="Course Name"
                  value={course?.title}
                  onChange={(e) =>
                    setCourse({ ...course!, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="courseDescription">Course Description</Label>
                <Textarea
                  id="courseDescription"
                  placeholder="Course Description"
                  value={course?.description}
                  onChange={(e) =>
                    setCourse({ ...course!, description: e.target.value })
                  }
                />
              </div>
              <div className="mx-auto w-fit">
                <Button onClick={editCourse}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
            {showErrors && <ValidationFields missingFields={errors} />}
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default CoursesEditForm;
