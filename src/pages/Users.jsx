import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../components/layout/Container";
import Search from "../components/form/Search";
import Table from "../components/display/Table";
import Ordercontrol from "../components/utilities/Order";
import Filtercontrol from "../components/utilities/Filtercontrol";
import useOrder from "../hooks/useOrder";
import { userColumns } from "../constants/Columns";
import { filterData } from "../utils/helpers";
import { useGet } from "../hooks/useApi";

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isFetched } = useGet(["customers"], "customers", {
    staleTime: Infinity,
  });

  // Memoized data transformations
  const normalizedData = useMemo(() => {
    if (!data) return [];
    return data?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      is_active: item.is_active,
    }));
  }, [data]);

  // Filter implementation
  const [filterKey, setFilterKey] = useState("all");
const filterOptions = [
  { value: "all", label: t("filter.all") },
  { value: "active", label: t("filter.active") },
  { value: "inactive", label: t("filter.inactive") }, 
];

  const filteredData = useMemo(() => {
    if (filterKey === "all") return normalizedData;
    return normalizedData.filter((item) =>
      filterKey === "active" ? item.is_active : !item.is_active
    );
  }, [normalizedData, filterKey]);

  // Search implementation
  const searchedData = useMemo(() => {
    return filterData(filteredData, searchTerm, [
      "id",
      "name",
      "email",
      "phone",
    ]);
  }, [filteredData, searchTerm]);

  // Order implementation
  const {
    orderKey,
    orderDirection,
    orderedItems,
    handleOrderChange,
    orderOptions,
  } = useOrder(searchedData, {
    orderKey: "name",
    orderDirection: "asc",
    orderOptions: ["name", "id", "email"],
  });

  // Event handlers
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterChange = useCallback((value) => {
    setFilterKey(value);
  }, []);

  if (!isFetched) {
    return <div>{t("loading")}...</div>;
  }

  return (
    <Container
      title={t("Customers")}
      additionalHeaderContent={
        <>
          <Search value={searchTerm} onChange={handleSearchChange} />

          <Filtercontrol
            filterKey={filterKey}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />

          <Ordercontrol
            orderKey={orderKey}
            orderDirection={orderDirection}
            orderOptions={orderOptions}
            onOrderChange={handleOrderChange}
          />
        </>
      }
    >
      <Table
        columns={userColumns(navigate, t)}
        data={orderedItems}
        pageSize={8}
        pagination={true}
      />
    </Container>
  );
}

export default Users;
