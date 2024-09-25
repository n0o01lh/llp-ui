import React, { useEffect, useState } from "react";
import { useListResourceByTeacher } from "@/hooks/useResourceApi";
import { Alert } from "../Alert";

import ResourcesGrid from "./ResourcesGrid";
import ResourcesForm from "./ResourcesForm";
import { useQueryClient } from "@tanstack/react-query";

export interface Resource {
  id: string;
  resource_type: string;
  title: string;
  image: string | undefined;
  price: number;
  duration: number;
  description: string;
  teacher_id: number;
  url: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Array<Resource>>([]);
  const [data, setData] = useState<unknown>();
  const { data: resourceList, isSuccess } = useListResourceByTeacher("2");
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["RESOURCES_LIST_BY_TEACHER_QUERY"],
    });
  }, [data]);

  return (
    <div>
      <ResourcesForm
        resources={resources}
        setResources={setResources}
        setData={setData}
      />
      <ResourcesGrid
        isSuccess={isSuccess}
        resources={resourceList}
        setResources={setResources}
      />

      {data != undefined && <Alert message="Resource Created" duration={5} />}
    </div>
  );
};

export default Resources;
