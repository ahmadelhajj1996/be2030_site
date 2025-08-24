import { useState,  useMemo } from "react";
import { useTranslation } from "react-i18next";
import {  useParams } from "react-router-dom";
import Table from "../components/display/Table";
import Container from "../components/layout/Container";
import { subcategoryColumns } from "../constants/Columns";
import { useGet  } from "../hooks/useApi";
import { filterData } from "../utils/helpers";

function Categories() {
  const { id } = useParams()
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const { data : subcategories , isFetched } = useGet(["sub-categories"] , "sub-categories", {
    staleTime: Infinity,
  });


  const data = useMemo(() => {
    if (!subcategories) return [];
    return subcategories?.filter((e) => e.category_id === parseInt(id))
  }, [subcategories]);
   // Memoized data transformations
  
  const normalized = useMemo(() => {
    if (!data) return [];
    return data
    .map((item) => ({
      id: item?.id,
      name: item?.name,
      image: item?.image,
      category : item?.category,
      products : item?.products?.length,
      createdAt: item?.created_at,
    }));
  }, [data]);

  // console.log();

  const filteredData = useMemo(() => {
    return filterData(normalized, searchTerm, ["id", "name"]);
  }, [normalized, searchTerm]);
  // Columns memoization
  const columns = useMemo(
    () => subcategoryColumns(t),
    []
  );

 
  if (!isFetched) {
    return <div>{t("loading")}...</div>;
  }

  return (
    <>
      <Container
        title={normalized[0].category.name}
        additionalHeaderContent={
          <div className="flex items-center gap-x-4"></div>
        }
      >
        <Table
          columns={columns}
          data={filteredData}
          pageSize={5}
          pagination={true}
          emptyMessage={t("no_categories_found")}
        />
      </Container>
    </>
  );
}

export default Categories;
