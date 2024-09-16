import React, { useRef, useState } from "react";
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
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ValidationFields from "../ValidationFields";
import { useCreateResource } from "@/hooks/useResourceApi";
import { Resource } from "./Resources";

interface ResourcesFormProps {
  resources: Array<Resource>;
  setResources: (resources: Array<Resource>) => void;
}

const ResourcesForm: React.FC<ResourcesFormProps> = (props) => {
  const { resources, setResources } = props;
  const [newResource, setNewResource] = useState({
    id: "",
    resource_type: "video",
    title: "",
    image: "",
    price: 0,
    duration: "",
    description: "",
    teacher_id: 1,
    url: "empty",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useCreateResource();

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
      };
      reader.readAsDataURL(file);
    }
  };

  const isValidResource = () => {
    if (
      newResource.resource_type === "video" ||
      newResource.resource_type === "audio"
    ) {
      return newResource.duration.trim() !== "";
    }
    return true;
  };

  const addResource = () => {
    if (newResource.title && isValidResource()) {
      setResources([
        ...resources,
        { ...newResource, id: Date.now().toString() },
      ]);
      setNewResource({
        id: "",
        resource_type: "video",
        title: "",
        image: "",
        price: 0,
        duration: "",
        description: "",
        teacher_id: 1,
        url: "empty",
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
      newResource.duration === ""
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
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Create Resource
      </h2>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
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
                </SelectContent>
              </Select>
            </div>
            <div>
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
            <div>
              <Label htmlFor="resourceImage">Resource Image URL</Label>
              <Input
                id="resourceImage"
                placeholder="Image URL"
                value={newResource.image}
                onChange={(e) =>
                  setNewResource({ ...newResource, image: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="resourceImageUpload">Upload Image</Label>
              <Input
                id="resourceImageUpload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
            <div>
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
            <div>
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
                  setNewResource({ ...newResource, duration: e.target.value })
                }
                required={
                  newResource.resource_type === "video" ||
                  newResource.resource_type === "audio"
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="resourceDescription">Resource Description</Label>
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
          </div>
          <Button onClick={addResource}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
          </Button>
          {showErrors && <ValidationFields missingFields={errors} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesForm;
