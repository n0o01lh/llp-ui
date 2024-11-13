import React, { useEffect, useState } from "react";
import { useListResourceByTeacher } from "@/hooks/useResourceApi";
import { Alert } from "../Alert";

import ResourcesGrid from "./ResourcesGrid";
import ResourcesForm from "./ResourcesForm";
import { useQueryClient } from "@tanstack/react-query";
import { UserStoreState, useUserStore } from "@/store/userStore";
import { jwtDecode } from "jwt-decode";

export interface Resource {
  id: string;
  resource_type: string;
  title: string;
  image: string | undefined;
  price: number;
  duration: number;
  description: string;
  url: string;
}

const Resources = () => {
  const userAuth = useUserStore((state: UserStoreState) => state.userAuth);
  const teacherId = (jwtDecode(userAuth?.token as string) as { id: number }).id;

  const [resources, setResources] = useState<Array<Resource>>([]);
  const [data, setData] = useState<unknown>();
  const { data: resourceList, isSuccess } = useListResourceByTeacher(teacherId);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["RESOURCES_LIST_BY_TEACHER_QUERY"],
    });
  }, [data, resources]);

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
