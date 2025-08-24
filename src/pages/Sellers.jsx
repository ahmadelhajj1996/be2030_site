import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../components/layout/Container";
import Search from "../components/form/Search";
import Table from "../components/display/Table";
import Ordercontrol from "../components/utilities/Order";
import Filtercontrol from "../components/utilities/Filtercontrol";
import useOrder from "../hooks/useOrder";
import { sellerColumns } from "../constants/Columns";
import { filterData } from "../utils/helpers";
import { useGet } from "../hooks/useApi";

function Sellers() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isFetched } = useGet(["sellers"], "sellers", {
    staleTime: Infinity,
  });

  // Memoized data transformations
  const normalizedData = useMemo(() => {
    if (!data) return [];
    return data?.data?.map((item) => ({
      id: item.user.id,
      name: item.user.name,
      email: item.user.email,
      phone: item.user.phone,
      store_owner_name: item.store_owner_name,
      store_name: item.store_name,
      address: item.address,
      logo: item.logo,
      status: item.status,
      description: item.description,
      created_at: item.created_at,
    }));
  }, [data]);

  // Filter implementation
  const [filterKey, setFilterKey] = useState("all");
const filterOptions = useMemo(
  () => [
    { value: "all", label: t("filter.all") },
    { value: "pending", label: t("filter.pending") },
    { value: "accepted", label: t("filter.accepted") },
    { value: "rejected", label: t("filter.rejected") },
  ],
  [t]
);
  const filteredData = useMemo(() => {
    if (filterKey === "all") return normalizedData;
    return normalizedData.filter((item) => item.status === filterKey);
  }, [normalizedData, filterKey]);

  // Search implementation
  const searchedData = useMemo(() => {
    return filterData(filteredData, searchTerm, [
      "id",
      "name",
      "email",
      "phone",
      "store_name",
      "store_owner_name",
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
    orderOptions: ["name", "id", "created_at"],
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
      title={t("Sellers")}
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
        columns={sellerColumns(navigate, t)}
        data={orderedItems}
        pageSize={8}
        pagination={true}
      />
    </Container>
  );
}

export default Sellers;
