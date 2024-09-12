import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  Trash2,
  Video,
  Headphones,
  FileText,
  Clock,
  DollarSign,
} from "lucide-react";
import { useCreateResource } from "@/hooks/useResourceApi";
import { Alert } from "./Alert";

export interface Resource {
  id: string;
  resource_type: string;
  title: string;
  image: string | undefined;
  price: number;
  duration: string;
  description: string;
  teacher_id: number;
  url: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Array<Resource>>([]);
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  //const [showAlert, setShowAlert] = useState(false);
  const { mutate, isSuccess } = useCreateResource();

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
    mutate(newResource);
  };

  const deleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
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
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4 dark:text-white">Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="relative overflow-hidden group">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => deleteResource(resource.id)}
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
              <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
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

      {isSuccess && <Alert message="Resource Created" />}
    </div>
  );
};

export default Resources;