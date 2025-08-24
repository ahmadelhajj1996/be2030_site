// add order to all ads components

import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Table from "../../components/display/Table";
import Search from "../../components/form/Search";
import Container from "../../components/layout/Container";
import { productColumns } from "../../constants/Columns";
import { useGet  } from "../../hooks/useApi";
import { filterData } from "../../utils/helpers";

function Categories() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isFetched,
  } = useGet( ["categories"], "categories", { staleTime: Infinity });

  const normalized = useMemo(() => {
    if (!data) return [];
    return data.map((category) => {
      // Calculate total products by summing products from all sub-categories
      const productCount =
        category?.sub_categories?.reduce((total, subCategory) => {
          return total + (subCategory?.products?.length || 0);
        }, 0) || 0;

      return {
        id: category?.id,
        name: category?.name,
        image: category?.image,
        sub_categories: category?.sub_categories?.length || 0,
        products: productCount, // Add the total product count
        createdAt: category?.created_at,
      };
    });
  }, [data]);



  const filteredData = useMemo(() => {
    return filterData(normalized, searchTerm, ["id", "name"]);
  }, [normalized, searchTerm]);
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);



  // Columns memoization
  const columns = useMemo(
    () => productColumns( navigate , t),
    [navigate]
  );


  if (!isFetched) {
    return <div>{t("loading")}...</div>;
  }

  return (
    <>
      <Container
        title={t("Products")}
        additionalHeaderContent={
          <div className="flex items-center gap-x-4">
            <Search
              placeholder={t("search_in_categories")}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        }
      >
        <Table
          columns={columns}
          data={filteredData}
          pageSize={10}
          pagination={true}
          emptyMessage={t("no_categories_found")}
        />
      </Container>
    </>
  );
}

export default Categories;


