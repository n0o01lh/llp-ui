import React, { useEffect, useState } from "react";
import { useListResourceByTeacher } from "@/hooks/useResourceApi";
import { Alert } from "../Alert";

import ResourcesGrid from "./ResourcesGrid";
import { useQueryClient } from "@tanstack/react-query";
import { UserStoreState, useUserStore } from "@/store/userStore";
import { jwtDecode } from "jwt-decode";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export interface Resource {
  id: string;
  resource_type: string;
  title: string;
  image: string | undefined;
  price: number;
  duration: number;
  description: string;
  content: string;
}

const Resources = () => {
  const userAuth = useUserStore((state: UserStoreState) => state.userAuth);
  const teacherId = (jwtDecode(userAuth?.token as string) as { id: number }).id;

  const [currentPage, setCurrentPage] = useState(1);
  const [resources, setResources] = useState<Array<Resource>>([]);
  const [data] = useState<unknown>();
  const {
    data: resourceList,
    isSuccess,
    refetch,
  } = useListResourceByTeacher(teacherId, currentPage);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["RESOURCES_LIST_BY_TEACHER_QUERY"],
    });
  }, [data, resources]);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Your Resources
        </h2>

        <Button onClick={() => navigate("new", { relative: "route" })}>
          <Plus className="mr-2 h-4 w-4" /> Create new resource
        </Button>
      </div>

      <ResourcesGrid
        isSuccess={isSuccess}
        resources={resourceList}
        setResources={setResources}
        updateResourcesPage={setCurrentPage}
      />

      {data != undefined && <Alert message="Resource Created" duration={5} />}
    </div>
  );
};

export default Resources;
