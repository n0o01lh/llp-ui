import React, { useState } from "react";
import { useCreateResource } from "@/hooks/useResourceApi";
import { Alert } from "../Alert";

import ResourcesGrid from "./ResourcesGrid";
import ResourcesForm from "./ResourcesForm";

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
  const { data } = useCreateResource();

  return (
    <div>
      <ResourcesForm resources={resources} setResources={setResources} />
      <ResourcesGrid resources={resources} setResources={setResources} />

      {data != undefined && <Alert message="Resource Created" duration={5} />}
    </div>
  );
};

export default Resources;
