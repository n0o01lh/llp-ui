import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { Resource } from "./Resources";
import { useNavigate, useParams } from "react-router";
import { useEditResource, useGetResource } from "@/hooks/useResourceApi";
import ValidationFields from "../ValidationFields";

const ResourcesEditForm = () => {
  const [resource, setResource] = useState<Resource>();
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useEditResource();
  const navigate = useNavigate();
  const { data, isError, isSuccess } = useGetResource(params["id"] as string);

  const handleFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResource({
          ...(resource as Resource),
          image: reader.result?.toString() || "",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const editResource = () => {
    const fieldErrors = [];

    if (resource?.title.trim() === "") {
      fieldErrors.push("Resource name is required");
    }
    if (resource!.price <= 0) {
      fieldErrors.push("Resource price is required and must be greater than 0");
    }
    if (resource?.resource_type.trim() === "") {
      fieldErrors.push("Resource type is required");
    }
    if (
      (resource?.resource_type === "video" ||
        resource?.resource_type === "audio") &&
      resource?.duration === 0
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
      mutation.mutate(resource as Resource);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setResource(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/resources");
    }
  }, [mutation.isSuccess]);

  if (isError) {
    return (
      <div>
        <h1>Error getting resource to edit, please back to previous page</h1>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Edit Resource
        </h2>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="resourceType">Resource Type</Label>
                <Select
                  value={resource?.resource_type}
                  onValueChange={(value) =>
                    setResource({ ...resource!, resource_type: value })
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
                  value={resource?.title}
                  onChange={(e) =>
                    setResource({ ...resource!, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="resourceImage">Resource Image URL</Label>
                <Input
                  id="resourceImage"
                  placeholder="Image URL"
                  value={resource?.image}
                  onChange={(e) =>
                    setResource({ ...resource!, image: e.target.value })
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
                  value={resource?.price}
                  onChange={(e) =>
                    setResource({
                      ...resource!,
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
                  value={resource?.duration}
                  onChange={(e) =>
                    setResource({
                      ...resource!,
                      duration: parseInt(e.target.value),
                    })
                  }
                  required={
                    resource?.resource_type === "video" ||
                    resource?.resource_type === "audio"
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="resourceDescription">
                  Resource Description
                </Label>
                <Textarea
                  id="resourceDescription"
                  placeholder="Brief description"
                  value={resource?.description}
                  onChange={(e) =>
                    setResource({
                      ...resource!,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mx-auto w-fit">
              <Button onClick={editResource}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>

            {showErrors && <ValidationFields missingFields={errors} />}
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default ResourcesEditForm;
