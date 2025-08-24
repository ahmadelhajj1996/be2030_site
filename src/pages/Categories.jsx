import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Table from "../components/display/Table";
import Search from "../components/form/Search";
import Container from "../components/layout/Container";
import useOrder from "../hooks/useOrder";
import { categoryColumns } from "../constants/Columns";
import { useGet } from "../hooks/useApi";
import { filterData } from "../utils/helpers";

function Categories() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, error } = useGet(
    ["categories", i18n.language],
    "categories",
    {
      staleTime: Infinity,
      lang: i18n.language,
    }
  );
  const normalizedCategories = useMemo(() => {
    if (!data) return [];
    return data.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image,
      sub_categories: category.sub_categories,
      createdAt: category.created_at,
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return filterData(normalizedCategories, searchTerm, ["id", "name"]);
  }, [normalizedCategories, searchTerm]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const {
    orderKey,
    orderDirection,
    orderedItems,
    handleOrderChange,
    orderOptions,
  } = useOrder(filteredData, {
    orderKey: "name",
    orderDirection: "asc",
    orderOptions: ["name", "id", "createdAt"],
  });

  const columns = useMemo(() => categoryColumns(navigate, t), [navigate, t]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        {t("loading")}...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error.message || t("error_loading_categories")}
      </div>
    );
  }
  return (
    <>
      <Container
        title={t("all_categories")}
        additionalHeaderContent={
          <div className="flex items-center gap-x-4 flex-wrap gap-y-2">
            <Search
              placeholder={t("search_in_categories")}
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 min-w-[200px]"
            />

            <div className="flex relative w-[220px]">
              <select
                name="orderkey"
                onChange={handleOrderChange}
                value={orderKey}
                className="px-3 py-2 w-4/5 border rounded focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all"
              >
                {orderOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(option.charAt(0).toUpperCase() + option.slice(1))}
                    {orderKey === option && ` (${orderDirection})`}
                  </option>
                ))}
              </select>
              {orderKey && (
                <button
                  onClick={() =>
                    handleOrderChange(
                      {
                        target: {
                          name: "orderkey",
                          value: orderKey,
                        },
                      },
                      orderDirection === "asc" ? "desc" : "asc"
                    )
                  }
                  className="absolute end-0 inset-y-0 px-3 py-2 border border-l-0 rounded-r bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label={`Sort ${
                    orderDirection === "asc" ? "descending" : "ascending"
                  }`}
                >
                  {orderDirection === "asc" ? "↓" : "↑"}
                </button>
              )}
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={orderedItems}
          pageSize={10}
          pagination={true}
          emptyMessage={t("no_categories_found")}
          loading={isLoading}
        />
      </Container>
    </>
  );
}

export default Categories;
