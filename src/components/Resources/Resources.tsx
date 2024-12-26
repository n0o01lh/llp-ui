import React, { useCallback, useEffect, useState } from "react";
import {
  useListResourceByTeacher,
  useListSearchResourceByTeacher,
} from "@/hooks/useResourceApi";
import { Alert } from "../Alert";
import _ from "lodash";

import ResourcesGrid from "./ResourcesGrid";
import { UserStoreState, useUserStore } from "@/store/userStore";
import { jwtDecode } from "jwt-decode";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import SearchBox from "../Shared/SearchBox";
import { PaginatorResult } from "../Shared/Paginator";

export interface Resource {
  id: string;
  resource_type: string;
  title: string;
  image: string | undefined;
  price: number;
  duration: number;
  description: string;
  content: string;
  extra_fields: {
    order: number;
  };
}

const Resources = () => {
  const userAuth = useUserStore((state: UserStoreState) => state.userAuth);
  const teacherId = (jwtDecode(userAuth?.token as string) as { id: number }).id;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [resources, setResources] = useState<PaginatorResult>();
  const [data] = useState<unknown>();
  const {
    data: resourceList,
    isSuccess,
    refetch,
    isRefetching,
  } = useListResourceByTeacher(teacherId, currentPage);
  const {
    data: resourceSearchList,
    isSuccess: searchSuccess,
    refetch: searchRefetch,
    isRefetching: isSearchRefetching,
  } = useListSearchResourceByTeacher(searchValue, teacherId, currentPage);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    if (searchValue.length == 0) {
      refetch();
    }
  }, [searchValue, searchRefetch, refetch]);

  useEffect(() => {
    if (isSuccess && !isRefetching) {
      setResources(resourceList);
    }
  }, [setResources, resourceList, isRefetching]);

  useEffect(() => {
    if (searchSuccess && !isSearchRefetching) {
      setResources(resourceSearchList);
    }
  }, [searchSuccess, setResources, resourceSearchList, isSearchRefetching]);

  const debouncedSearch = useCallback(_.debounce(searchRefetch, 500), []);

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

      <div className="flex md:flex-row flex-col justify-between content-center items-center mb-4">
        <p className="pt-2 text-gray-600">
          These are your resources, you can edit or delete them if you want.
        </p>
        <div className="pt-2 md:w-1/2 w-full">
          <SearchBox
            searchValue={searchValue}
            onChange={(value: string) => {
              setCurrentPage(1);
              setSearchValue(value);
              debouncedSearch();
            }}
          />
        </div>
      </div>
      <ResourcesGrid
        isSuccess={isSuccess}
        resources={resources as PaginatorResult}
        setResources={setResources}
        updateResourcesPage={setCurrentPage}
      />

      {data != undefined && <Alert message="Resource Created" duration={5} />}
    </div>
  );
};

export default Resources;
