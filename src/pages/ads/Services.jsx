import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../../components/layout/Container";
import Table from "../../components/display/Table";
import Search from "../../components/form/Search";
import FilterControl from "../../components/utilities/Filtercontrol";
import { useGet } from "../../hooks/useApi";
import { filterData } from "../../utils/helpers";
import { serviceColumns } from "../../constants/Columns";

function Services() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: services = [], isFetched } = useGet( ["services"], "services", {
    staleTime: Infinity,
    select: (data) => data,
  });

  // Extract unique filter options from data
  const filterOptions = useMemo(() => {
    if (!isFetched) return { locations: [] };

    const locations = [
      ...new Set(services.map((service) => service.location)),
    ].filter(Boolean);

    return {
      locations: ["all", ...locations],
    };
  }, [services, isFetched]);

  // State for filters
  const [filters, setFilters] = useState({
    location: "all",
  });

  // Combined filtered data
  const filteredServices = useMemo(() => {
    if (!isFetched) return [];

    let result = services;

    // Apply search filter
    if (searchTerm) {
      result = filterData(result, searchTerm, [
        "id",
        "title",
        "phone_number",
        "email",
        "type",
        "location",
        "price",
        "days_hours",
      ]);
    }

    // Apply location filter
    if (filters.location !== "all") {
      result = result.filter(
        (service) => service.location === filters.location
      );
    }

    return result;
  }, [services, searchTerm, filters, isFetched]);

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filterName) => (value) => {
      setFilters((prev) => ({ ...prev, [filterName]: value }));
    },
    []
  );

  // Handle search change
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const columns = useMemo(() => serviceColumns(navigate), [navigate]);

  return (
    <Container
      title={t("services")}
      additionalHeaderContent={
        <div className="flex flex-wrap items-center gap-4 mb-4 mt-2">
          <div className="flex flex-col -mt-5">
            <label className="text-xs text-gray-500 mb-1">
              {t("filter_by_location")}
            </label>
            <FilterControl
              filterKey={filters.location}
              filterOptions={filterOptions.locations}
              onFilterChange={handleFilterChange("location")}
              className="flex-shrink-0"
            />
          </div>

          <Search
            placeholder={t("search_in_services")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow min-w-[200px]"
          />
        </div>
      }
    >
      <Table
        columns={columns}
        data={filteredServices}
        pageSize={10}
        pagination={true}
        emptyMessage={t("no_services_found")}
      />
    </Container>
  );
}

export default Services;
