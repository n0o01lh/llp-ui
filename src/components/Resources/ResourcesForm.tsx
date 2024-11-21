import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ValidationFields from "../ValidationFields";
import { useCreateResource } from "@/hooks/useResourceApi";
//import { Resource } from "./Resources";
import TextEditor from "../Shared/TextEditor";
import { useNavigate } from "react-router";
import Loader from "../Shared/Loader";
import QuizForm, { Quiz } from "./QuizForm";

/* interface ResourcesFormProps {
  resources: Array<Resource>;
  setResources: (resources: Array<Resource>) => void;
  setData: (data: unknown) => void;
} */

const ResourcesForm = () => {
  //const { resources, setResources, setData } = props;
  const [newResource, setNewResource] = useState({
    id: "",
    resource_type: "video",
    title: "",
    image: "",
    price: 0,
    duration: 0,
    description: "",
    content: "empty",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isSuccess, isPending } = useCreateResource();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewResource({
          ...newResource,
          image: reader.result?.toString() || "",
        });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isValidResource = () => {
    if (
      newResource.resource_type === "video" ||
      newResource.resource_type === "audio"
    ) {
      return newResource.duration > 0;
    }
    return true;
  };

  const addResource = () => {
    if (newResource.title && isValidResource()) {
      /*       setResources([
        ...resources,
        { ...newResource, id: Date.now().toString() },
      ]);
 */
      setNewResource({
        id: "",
        resource_type: "video",
        title: "",
        image: "",
        price: 0,
        duration: 0,
        description: "",
        content: "empty",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    validateFields();
  };

  const validateFields = () => {
    const fieldErrors = [];

    if (newResource.title.trim() === "") {
      fieldErrors.push("Resource name is required");
    }
    if (newResource.price <= 0) {
      fieldErrors.push("Resource price is required and must be greater than 0");
    }
    if (newResource.resource_type.trim() === "") {
      fieldErrors.push("Resource type is required");
    }
    if (
      (newResource.resource_type === "video" ||
        newResource.resource_type === "audio") &&
      newResource.duration === 0
    ) {
      fieldErrors.push(
        "Resource duration is required and must be greater than 0 when resource type is video or audio"
      );
    }

    setErrors(fieldErrors);

    if (fieldErrors.length > 0) {
      setShowErrors(true);
    } else {
      setShowErrors(false);
      mutate(newResource);
      setImagePreview("");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/resources");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Create Resource
      </h2>
      <Card className="mb-8">
        {isPending ? (
          <Loader />
        ) : (
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="resourceType">Resource Type</Label>
                <Select
                  value={newResource.resource_type}
                  onValueChange={(value) =>
                    setNewResource({ ...newResource, resource_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Resource Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="resourceName">Resource Name</Label>
                <Input
                  id="resourceName"
                  placeholder="Resource Name"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="resourceImageUpload">Upload Image</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Input
                    id="resourceImageUpload"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  {imagePreview && (
                    <div className="relative w-32 h-32">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1"
                        onClick={() => {
                          setImagePreview(null);
                          setNewResource({ ...newResource, image: "" });
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="resourcePrice">Resource Price</Label>
                <Input
                  id="resourcePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Price"
                  value={newResource.price}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      price: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              {newResource.resource_type === "video" ||
              newResource.resource_type === "audio" ? (
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="resourceDuration">
                    Resource Duration (minutes)
                  </Label>
                  <Input
                    id="resourceDuration"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Duration"
                    value={newResource.duration}
                    onChange={(e) =>
                      setNewResource({
                        ...newResource,
                        duration: parseInt(e.target.value),
                      })
                    }
                    required={
                      newResource.resource_type === "video" ||
                      newResource.resource_type === "audio"
                    }
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="col-span-2">
                <Label htmlFor="resourceDescription">
                  Resource Description
                </Label>
                <Textarea
                  id="resourceDescription"
                  placeholder="Brief description"
                  value={newResource.description}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              {newResource.resource_type === "reading" ? (
                <div className="col-span-2">
                  <Label htmlFor="resourceContent">Reading Content</Label>
                  <TextEditor
                    onChange={(e) =>
                      setNewResource({
                        ...newResource,
                        content: e,
                      })
                    }
                  />
                </div>
              ) : (
                <></>
              )}
              {newResource.resource_type === "quiz" ? (
                <div className="col-span-2">
                  <Label htmlFor="resourceQuiz">Create your Quiz</Label>
                  <QuizForm
                    setCurrentQuiz={(quiz: Quiz) =>
                      setNewResource({
                        ...newResource,
                        content: JSON.stringify(quiz),
                      })
                    }
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full text-center">
              <Button onClick={addResource}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
              </Button>
            </div>
            {showErrors && <ValidationFields missingFields={errors} />}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ResourcesForm;
