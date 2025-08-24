import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../../components/layout/Container";
import Table from "../../components/display/Table";
import Search from "../../components/form/Search";
import FilterControl from "../../components/utilities/Filtercontrol";
import { useGet } from "../../hooks/useApi";
import { filterData } from "../../utils/helpers";
import { offerColumns } from "../../constants/Columns";

function Offers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data = [], isFetched } = useGet(["offers"] , "offers", {
    staleTime: Infinity,
    select: (data) => data.offers,
  });

  const normalized = useMemo(() => {
    if (!data) return [];
    return data.map((offer) => ({
      id: offer?.id,
      type: offer?.type,
      description: offer?.description,
      discount: offer?.discount,
      offer_on: offer?.on?.type,
      governorate: offer?.on?.data?.governorate,
      offer_item: offer?.on?.data,
    }));
  }, [data]);

  const filterOptions = useMemo(() => {
    if (!isFetched) return { governorates: [], types: [] };

    // Extract unique governorates from offers
    const governorates = [
      ...new Set(
        normalized
          .map((offer) => offer.governorate)
          .filter((gov) => gov !== undefined)
      ),
    ].sort();

    // Extract unique offer types
    const types = [...new Set(normalized.map((offer) => offer.type))].sort();

    return {
      governorates: ["all", ...governorates],
      types: ["all", ...types],
    };
  }, [normalized, isFetched]);

  // State for filters
  const [filters, setFilters] = useState({
    governorate: "all",
    type: "all",
  });

  // Combined filtered data
  const filteredOffers = useMemo(() => {
    if (!isFetched) return [];

    let result = normalized;

    // Apply search filter
    if (searchTerm) {
      result = filterData(result, searchTerm, [
        "id",
        "type",
        "discount",
        "offer_on",
      ]);
    }

    // Apply governorate filter
    if (filters.governorate !== "all") {
      result = result.filter(
        (offer) => offer.governorate === filters.governorate
      );
    }

    // Apply type filter
    if (filters.type !== "all") {
      result = result.filter((offer) => offer.type === filters.type);
    }

    return result;
  }, [normalized, searchTerm, filters, isFetched]);

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

  const columns = useMemo(() => offerColumns(navigate), [navigate]);

  return (
    <Container
      title={t("offers")}
      additionalHeaderContent={
        <div className="flex flex-wrap items-center gap-4 mb-4 mt-2">
          <div className="flex flex-col -mt-5">
            <label className="text-xs text-gray-500 mb-1">
              {t("filter_by_governorate")}
            </label>
            <FilterControl
              filterKey={filters.governorate}
              filterOptions={filterOptions.governorates}
              onFilterChange={handleFilterChange("governorate")}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex flex-col -mt-5">
            <label className="text-xs text-gray-500 mb-1">
              {t("filter_by_type")}
            </label>
            <FilterControl
              filterKey={filters.type}
              filterOptions={filterOptions.types}
              onFilterChange={handleFilterChange("type")}
              className="flex-shrink-0"
            />
          </div>

          <Search
            placeholder={t("search_in_offers")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow min-w-[200px]"
          />
        </div>
      }
    >
      <Table
        columns={columns}
        data={filteredOffers}
        pageSize={10}
        pagination={true}
        emptyMessage={t("no_offers_found")}
      />
    </Container>
  );
}

export default Offers;
