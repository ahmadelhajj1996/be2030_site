
function Home() {
  return (
    <div>Home</div>
  )
}

export default Home


// import { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import Table from "../../components/display/Table";
// import Container from "../../components/layout/Container";
// import Search from "../../components/form/Search";
// import { getServiceAdColumns } from "../../constants/Columns";
// import { services } from "../../constants/servicead";
// import { filterAndFormatData } from "../../utils/helpers";
// import useFilter from "../../hooks/useFilter";
// import useOrder from "../../hooks/useOrder";

// function Services() {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const [searchTerm, setSearchTerm] = useState("");

//   // Extract unique service types and governorates for filter options
//   const serviceTypes = [...new Set(services.map((service) => service.type))];
//   const governorates = [
//     ...new Set(services.map((service) => service.governorate)),
//   ];

//   // Filter by service type
//   const {
//     filterKey: serviceTypeFilter,
//     filteredItems: serviceTypeFilteredItems,
//     handleFilterChange: handleServiceTypeFilterChange,
//   } = useFilter(services, {
//     filterKey: "all",
//     filterOptions: ["all", ...serviceTypes],
//     filterProperty: "type",
//     storageKey: "service-type-filter",
//   });

//   // Filter by governorate
//   const {
//     filterKey: governorateFilter,
//     filteredItems: governorateFilteredItems,
//     handleFilterChange: handleGovernorateFilterChange,
//   } = useFilter(serviceTypeFilteredItems, {
//     filterKey: "all",
//     filterOptions: ["all", ...governorates],
//     filterProperty: "governorate",
//     storageKey: "service-governorate-filter",
//   });

//   // Sorting functionality
//   const {
//     orderKey,
//     orderDirection,
//     orderedItems,
//     handleOrderChange,
//     orderOptions,
//   } = useOrder(governorateFilteredItems, {
//     orderKey: "title",
//     orderDirection: "asc",
//     orderOptions: ["title", "type", "location", "price", "createdAt"],
//   });

//   const handleSearchChange = useCallback((e) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   const toggleSortDirection = useCallback(() => {
//     handleOrderChange(
//       {
//         target: {
//           name: "orderkey",
//           value: orderKey,
//         },
//       },
//       orderDirection === "asc" ? "desc" : "asc"
//     );
//   }, [handleOrderChange, orderKey, orderDirection]);

//   const filteredData = filterAndFormatData(orderedItems, searchTerm, [
//     "id",
//     "title",
//     "type",
//     "location",
//   ]);

//   return (
//     <Container
//       title={t("Services")}
//       additionalHeaderContent={
//         <div className="flex gap-4 flex-wrap items-end">
//           <div className="flex flex-col gap-1">
//             <label htmlFor="search" className="text-xs text-gray-500">
//               {t(" ")}
//             </label>
//             <Search
//               id="search"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder={t("Search by id, title or type")}
//             />
//           </div>

//           {/* Service Type Filter */}
//           <div className="flex flex-col gap-1">
//             <label
//               htmlFor="serviceTypeFilter"
//               className="text-xs text-gray-500"
//             >
//               {t("Filter by service type")}
//             </label>
//             <select
//               id="serviceTypeFilter"
//               name="serviceTypeFilter"
//               onChange={handleServiceTypeFilterChange}
//               value={serviceTypeFilter}
//               className="px-3 py-2 border rounded focus:border-transparent transition-all w-[200px]"
//             >
//               {["all", ...serviceTypes].map((type) => (
//                 <option key={type} value={type}>
//                   {t(
//                     type.charAt(0).toUpperCase() +
//                       type.slice(1).replace("_", " ")
//                   )}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Governorate Filter */}
//           <div className="flex flex-col gap-1">
//             <label
//               htmlFor="governorateFilter"
//               className="text-xs text-gray-500"
//             >
//               {t("Filter by governorate")}
//             </label>
//             <select
//               id="governorateFilter"
//               name="governorateFilter"
//               onChange={handleGovernorateFilterChange}
//               value={governorateFilter}
//               className="px-3 py-2 border rounded focus:border-transparent transition-all w-[200px]"
//             >
//               {["all", ...governorates].map((gov) => (
//                 <option key={gov} value={gov}>
//                   {t(gov.charAt(0).toUpperCase() + gov.slice(1))}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sorting */}
//           <div className="flex flex-col gap-1">
//             <label htmlFor="orderkey" className="text-xs text-gray-500">
//               {t("Sort by")}
//             </label>
//             <div className="flex relative w-[220px]">
//               <select
//                 id="orderkey"
//                 name="orderkey"
//                 onChange={handleOrderChange}
//                 value={orderKey}
//                 className="px-3 py-2 w-4/5 border rounded focus:border-transparent transition-all"
//               >
//                 {orderOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {t(
//                       option.charAt(0).toUpperCase() +
//                         option.slice(1).replace("_", " ")
//                     )}
//                     {orderKey === option && ` (${orderDirection})`}
//                   </option>
//                 ))}
//               </select>
//               {orderKey && (
//                 <button
//                   onClick={toggleSortDirection}
//                   className="absolute end-0 inset-y-0 px-3 py-2 border"
//                   aria-label={
//                     orderDirection === "asc"
//                       ? t("Sort descending")
//                       : t("Sort ascending")
//                   }
//                 >
//                   {orderDirection === "asc" ? "↓" : "↑"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       }
//     >
//       <Table
//         columns={getServiceAdColumns(navigate, true)}
//         data={filteredData}
//         pageSize={8}
//         pagination={true}
//       />
//     </Container>
//   );
// }

// export default Services;
