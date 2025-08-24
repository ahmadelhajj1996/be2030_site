import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import Table from "../../components/display/Table";
import Search from "../../components/form/Search";
import Filtercontrol from "../../components/utilities/Filtercontrol";
import { useGet } from "../../hooks/useApi";
import { productadColumns } from "../../constants/Columns";
import { filterData } from "../../utils/helpers";
import useOrder from "../../hooks/useOrder";

const initialFilters = {
  sub_category_id: null,
  is_featured: null,
  price: null,
  seller_id: null,
  newest: null,
  title: null,
  price_min: null,
  price_max: null,
  is_active: "all",
};

function Product() {
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState(() => {
    // Load filters from localStorage if available
    const savedFilters = localStorage.getItem(`product-filters-${id}`);
    return savedFilters ? JSON.parse(savedFilters) : initialFilters;
  });

  const { data: subcategories, isFetched } = useGet(
    ["sub-categories"],
    "sub-categories",
    {
      staleTime: Infinity,
    }
  );

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`product-filters-${id}`, JSON.stringify(filters));
  }, [filters, id]);

  // Save search term to localStorage
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem(`product-search-${id}`);
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }

    return () => {
      localStorage.setItem(`product-search-${id}`, searchTerm);
    };
  }, [id]); // Only run once on mount

  // Save search term when it changes
  useEffect(() => {
    localStorage.setItem(`product-search-${id}`, searchTerm);
  }, [searchTerm, id]);

  // Filter subcategories by category_id
  const data = useMemo(() => {
    if (!subcategories) return [];
    return subcategories?.filter((e) => e.category_id === parseInt(id));
  }, [subcategories, id]);

  // Normalize subcategories for dropdown
  const normalized = useMemo(() => {
    if (!data) return [];
    return data.map((item) => ({
      id: item?.id,
      name: item?.name,
    }));
  }, [data]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.append("category_id", id);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "" && value !== "all") {
        params.append(key, value);
      }
    });

    return params.toString();
  }, [filters, id]);

  const url = `products?${queryString}`;

  const { data: productsarray, isFetched: productsFetched } = useGet(
    ["products", id, filters],
    url,
    {
      staleTime: Infinity,
    }
  );

  // Process product data
  const productsdata = useMemo(() => {
    if (!productsFetched || !productsarray?.products) return [];

    return productsarray.products.map((productData) => {
      const mainCurrency = productData.costs.find(
        (cost) => cost.is_main === 1
      )?.from_currency;

      return {
        ...productData,
        product: {
          ...productData.product,
          mainCurrency,
        },
      };
    });
  }, [productsFetched, productsarray]);

  // Extract and normalize products
  const allproducts = useMemo(() => {
    return productsdata.map((product) => ({
      ...product.product,
      mainCurrency: product.product.mainCurrency,
    }));
  }, [productsdata]);

  // Filter by is_active status
  const filteredByStatus = useMemo(() => {
    if (filters.is_active === "all") return allproducts;
    return allproducts.filter((product) =>
      filters.is_active === "active" ? product.is_active : !product.is_active
    );
  }, [allproducts, filters.is_active]);

  // Search implementation
  const searchedData = useMemo(() => {
    return filterData(filteredByStatus, searchTerm, ["id", "title"]);
  }, [filteredByStatus, searchTerm]);

  // Order implementation
  const { orderedItems } = useOrder(searchedData, {
    orderKey: "title",
    orderDirection: "asc",
    orderOptions: ["title", "id"],
  });

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const item = normalized.find((item) => item.id === selectedId);
    if (item) {
      setSelectedItem(item);
      setFilters((prev) => ({ ...prev, sub_category_id: item.id }));
      localStorage.setItem(`selectedItem-${id}`, JSON.stringify(item));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const handleStatusFilterChange = useCallback((value) => {
    setFilters((prev) => ({ ...prev, is_active: value }));
  }, []);

  const resetFilters = () => {
    setFilters(initialFilters);
    if (normalized.length > 0) {
      setSelectedItem(normalized[0]);
    }
    setSearchTerm("");
  };

  useEffect(() => {
    if (normalized.length > 0) {
      const savedSelectedItem = localStorage.getItem(`selectedItem-${id}`);
      const savedFilters = localStorage.getItem(`product-filters-${id}`);

      if (savedSelectedItem) {
        try {
          const parsedItem = JSON.parse(savedSelectedItem);
          if (normalized.some((item) => item.id === parsedItem.id)) {
            setSelectedItem(parsedItem);
            return;
          }
        } catch (e) {
          console.error("Failed to parse saved selectedItem", e);
        }
      }

      // If we have saved filters, use the sub_category_id from there
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        if (parsedFilters.sub_category_id) {
          const matchingItem = normalized.find(
            (item) => item.id === parsedFilters.sub_category_id
          );
          if (matchingItem) {
            setSelectedItem(matchingItem);
            return;
          }
        }
      }

      // Fallback to first item
      setSelectedItem(normalized[0]);
    }
  }, [normalized, id]);

  const productcolumns = useMemo(
    () => productadColumns(navigate, t),
    [navigate]
  );

 
  return (
    <Container
      additionalHeaderContent={
        <div className="flex gap-2 fixed top-[72px] end-4 z-40">
          <>
            <Filtercontrol
              filterKey={filters.is_active}
              filterOptions={["all", "active", "inactive"]}
              onFilterChange={handleStatusFilterChange}
            />
            <select
              value={selectedItem?.id || ""}
              onChange={handleSelectChange}
              className="p-2 border border-gray-300 rounded-md w-[200px] bg-white"
            >
              {normalized.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <Search value={searchTerm} onChange={handleSearchChange} />
          </>
        </div>
      }
    >
      <div className="relative">
        {isFetched && productsFetched && (
          <div className="mt-20 w-3/4">
            <Table
              columns={productcolumns}
              data={orderedItems}
              pageSize={8}
              pagination={true}
              emptyMessage={t("no_categories_found")}
            />
          </div>
        )}

        {orderedItems.length > 0 && (
          <div className="fixed top-40 end-0 h-96 w-80 bg-white shadow-lg z-30 overflow-y-auto pt-4 border-l">
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-medium mb-4 -mt-8">{t("filters")}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("filter.featured")}
                  </label>
                  <select
                    name="is_featured"
                    value={filters.is_featured || ""}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">{t("filter.all")}</option>
                    <option value="1">{t("filter.featured")}</option>
                    <option value="0">{t("filter.not_featured")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("status")}
                  </label>
                  <select
                    name="is_active"
                    value={filters.is_active}
                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="all">{t("filter.all")}</option>
                    <option value="active">{t("filter.active")}</option>
                    <option value="inactive">{t("filter.inactive")}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm bordered bg-rose-500 text-white"
                >
                  {t("reset_filters")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Product;
