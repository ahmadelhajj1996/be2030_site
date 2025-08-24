import Button from "../layout/Button";
import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

const Table = ({
  columns,
  data,
  pageSize = 10,
  pagination = true,
  initialDir = "ltr",
  notlist = true,
}) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("tableCurrentPage");
    const savedTimestamp = localStorage.getItem("tableCurrentPageTimestamp");

    if (savedPage && savedTimestamp) {
      const now = new Date().getTime();
      const oneHour = 60 * 60 * 1000;
      if (now - parseInt(savedTimestamp, 10) < oneHour) {
        return parseInt(savedPage, 10);
      } else {
        localStorage.removeItem("tableCurrentPage");
        localStorage.removeItem("tableCurrentPageTimestamp");
      }
    }
    return 1;
  });

  const { t, i18n } = useTranslation();
  const [dir, setDir] = useState(initialDir);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      const isRtl = i18n.dir(lng) === "rtl";
      setDir(isRtl ? "rtl" : "ltr");
    };

    handleLanguageChange(i18n.language);
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    if (pagination) {
      localStorage.setItem("tableCurrentPage", currentPage.toString());
      localStorage.setItem(
        "tableCurrentPageTimestamp",
        new Date().getTime().toString()
      );
    }
  }, [currentPage, pagination]);

  const paginatedData = useMemo(() => {
    if (!pagination) return data;
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(data.length / pageSize);

  useEffect(() => {
    if (pagination && totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage, pagination]);

  const getRowId = (row) => {
    if (row.id) return row.id;
    if (row._id) return row._id;
    return JSON.stringify(row);
  };

  const getPaginationText = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, data.length);
    const total = data.length;

    if (dir === "rtl") {
      return (
        <span>
          {t("table.pagination.display")}{" "}
          <span className="underline underline-offset-2">{start}</span>{" "}
          {t("table.pagination.to")}{" "}
          <span className="underline underline-offset-2">{end}</span>{" "}
          {t("table.pagination.of")}{" "}
          <span className="underline underline-offset-2">{total}</span>
        </span>
      );
    } else {
      return (
        <span>
          {t("table.pagination.showing")}{" "}
          <span className="underline underline-offset-2">{start}</span>{" "}
          {t("table.pagination.to")}{" "}
          <span className="underline underline-offset-2">{end}</span>{" "}
          {t("table.pagination.of")}{" "}
          <span className="underline underline-offset-2">{total}</span>
        </span>
      );
    }
  };

  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2, 3];
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full mt-[50px] p-6">
        <p className="text-gray-900 text-base">{t("table.no_data")}</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white rounded-none shadow bordered overflow-hidden h-full mt-8"
      dir={dir}
    >
      <div className="flex-1 overflow-auto">
        <table
          className="min-w-full divide-y divide-gray-200"
          style={{ tableLayout: "fixed" }}
        >
          {notlist && (
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 py-3 text-start text-sm uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis"
                    style={
                      column.width
                        ? {
                            width:
                              typeof column.width === "number"
                                ? `${column.width}px`
                                : column.width,
                            maxWidth:
                              typeof column.width === "number"
                                ? `${column.width}px`
                                : column.width,
                          }
                        : {}
                    }
                  >
                    <div className="flex items-center justify-between">
                      {column.title}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row) => (
              <tr
                key={getRowId(row)}
                className="transition-colors duration-150 hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={`${getRowId(row)}-${column.key}`}
                    className="px-6 py-4 text-xs text-gray-900 transition-colors duration-150 overflow-hidden text-ellipsis whitespace-nowrap"
                    style={
                      column.width
                        ? {
                            width:
                              typeof column.width === "number"
                                ? `${column.width}px`
                                : column.width,
                            maxWidth:
                              typeof column.width === "number"
                                ? `${column.width}px`
                                : column.width,
                          }
                        : {}
                    }
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="fixed bottom-6 end-2 px-4 ">
          <div className="flex items-center gap-x-20  ">
            <div>
              <p className="textb">{getPaginationText()}</p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <Button
                  prefixIcon={
                    dir === "rtl" ? <FaAnglesRight /> : <FaAnglesLeft />
                  }
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="w-[40px] h-[40px] disabled:text-gray-500"
                  aria-label={t("table.pagination.first_page")}
                />
                <Button
                  prefixIcon={
                    dir === "rtl" ? <FaAngleRight /> : <FaAngleLeft />
                  }
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="w-[40px] h-[40px] disabled:text-gray-500"
                  aria-label={t("table.pagination.previous_page")}
                />

                {getVisiblePages().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200 ${
                      currentPage === pageNum
                        ? "bg-rose-500 text-white border-rose-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                ))}

                <Button
                  prefixIcon={
                    dir === "rtl" ? <FaAngleLeft /> : <FaAngleRight />
                  }
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-[40px] h-[40px] disabled:text-gray-500"
                  aria-label={t("table.pagination.next_page")}
                />
                <Button
                  prefixIcon={
                    dir === "rtl" ? <FaAnglesLeft /> : <FaAnglesRight />
                  }
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="w-[40px] h-[40px] disabled:text-gray-500"
                  aria-label={t("table.pagination.last_page")}
                />
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      render: PropTypes.func,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
  pagination: PropTypes.bool,
  initialDir: PropTypes.oneOf(["ltr", "rtl"]),
  notlist: PropTypes.bool,
};

export default Table;
