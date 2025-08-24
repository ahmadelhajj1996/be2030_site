import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../../components/layout/Container";
import Table from "../../components/display/Table";
import Search from "../../components/form/Search";
import FilterControl from "../../components/utilities/Filtercontrol";
import { useGet } from "../../hooks/useApi";
import { filterData } from "../../utils/helpers";
import { seekingadColumns } from "../../constants/Columns";

function Seekings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobType: "all",
    governorate: "all",
  });

  const { data: jobs = [], isFetched } = useGet(["jobs"], "jobs", {
    staleTime: Infinity,
    select: (data) => data?.filter((job) => job.type === "search_for_work"),
  });
 
 
  
  const filterOptions = useMemo(() => {
    if (!isFetched) return { jobTypes: [], governorates: [] };

    const jobTypes = [...new Set(jobs.map((job) => job.job_type))].filter(
      Boolean
    );
    const governorates = [
      ...new Set(jobs.map((job) => job.governorate)),
    ].filter(Boolean);

    return {
      jobTypes: ["all", ...jobTypes],
      governorates: ["all", ...governorates],
    };
  }, [jobs, isFetched]);

  const filteredJobs = useMemo(() => {
    if (!isFetched) return [];

    let result = jobs;

    if (searchTerm) {
      result = filterData(result, searchTerm, [
        "id",
        "title",
        "phone_number",
        "job_type",
        "governorate",
      ]);
    }

    if (filters.jobType !== "all") {
      result = result.filter((job) => job.job_type === filters.jobType);
    }

    if (filters.governorate !== "all") {
      result = result.filter((job) => job.governorate === filters.governorate);
    }

    return result;
  }, [jobs, searchTerm, filters, isFetched]);

  const handleFilterChange = useCallback(
    (filterName) => (value) => {
      setFilters((prev) => ({ ...prev, [filterName]: value }));
    },
    []
  );

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const columns = useMemo(() => seekingadColumns(navigate, t), [navigate, t]);

  return (
    <Container
      title={t("jobs.Job Seeking")}
      additionalHeaderContent={
        <div className="flex flex-wrap items-center gap-4 mb-4 mt-2">
          <div className="flex flex-col -mt-5">
            <label className="text-xs text-gray-500 mb-1">
              {t("jobs.filters.job_type")}
            </label>
            <FilterControl
              filterKey={filters.jobType}
              filterOptions={filterOptions.jobTypes}
              onFilterChange={handleFilterChange("jobType")}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex flex-col -mt-5">
            <label className="text-xs text-gray-500 mb-1">
              {t("jobs.filters.location")}
            </label>
            <FilterControl
              filterKey={filters.governorate}
              filterOptions={filterOptions.governorates}
              onFilterChange={handleFilterChange("governorate")}
              className="flex-shrink-0"
            />
          </div>

          <Search
            placeholder={t("jobs.search_placeholder")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow min-w-[200px]"
          />
        </div>
      }
    >
      <Table
        columns={columns}
        data={filteredJobs}
        pageSize={10}
        pagination={true}
        emptyMessage={t("jobs.no_jobs_found")}
      />
    </Container>
  );
}

export default Seekings;
