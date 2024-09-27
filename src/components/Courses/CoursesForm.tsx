import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Course } from "./Courses";
import { useCreateCourse } from "@/hooks/useCourseApi";
import ValidationFields from "../ValidationFields";

interface CoursesFormProps {
  setCourses: (courses: Array<Course>) => void;
  courses: Array<Course>;
}

const CoursesForm: React.FC<CoursesFormProps> = (props) => {
  const { courses, setCourses } = props;
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [addCourseButton, setAddCourseButton] = useState(false);
  const [newCourse, setNewCourse] = useState<Course>({
    id: "",
    title: "",
    description: "",
    teacher_id: 2,
    resources: [],
  });
  const { mutate } = useCreateCourse();

  useEffect(() => {
    if (newCourse.title && !showErrors) {
      setCourses([...courses, { ...newCourse, id: Date.now().toString() }]);
      setNewCourse({
        id: "",
        title: "",
        description: "",
        teacher_id: 2,
        resources: [],
      });
      setAddCourseButton(false);
    }
  }, [showErrors, addCourseButton]);

  const addCourse = () => {
    const fieldErrors = [];

    if (newCourse.title.trim() === "") {
      fieldErrors.push("Course name is required");
    }
    if (newCourse.description.length <= 0) {
      fieldErrors.push("Course description is required");
    }

    setErrors(fieldErrors);

    if (fieldErrors.length > 0) {
      setShowErrors(true);
    } else {
      setShowErrors(false);
      mutate(newCourse);
    }

    setAddCourseButton(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Create Course</h2>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                placeholder="Course Name"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="courseDescription">Course Description</Label>
              <Textarea
                id="courseDescription"
                placeholder="Course Description"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
              />
            </div>
            <Button onClick={addCourse}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Course
            </Button>
          </div>
          {showErrors && <ValidationFields missingFields={errors} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesForm;
