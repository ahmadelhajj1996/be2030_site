import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { formatDate } from '../utils/helpers'
 
// Category columns configuration

export const categoryColumns = (onDeleteClick) => [
  {
    key: "id",
    title: "الرقم التسلسلي",
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: "الاسم",
    width: "125px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "description",
    title: "الوصف",
    width: "350px",
    render: (item) => (
      <span className="font-semibold">{item?.description}</span>
    ),
  },
  {
    key: "actions",
    title: "الاجرائات",
    width: "100px",
    render: (item) => (
      <div className="flex gap-x-8">
        <button
          onClick={() => onDeleteClick(item)}
          aria-label="Delete"
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];


export const subcategoryColumns = ( t ) => [
  {
    key: "id",
    title: t("id"),
    width: "200px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: t("Name"),
    width: "300px",
    render: (item) => <span className="font-semibold">{item?.name}</span>,
  },
  {
    key: "products",
    title: t("Number of products"),
    width: "300px",
    render: (item) => (
      <span className="font-semibold text-center ms-20 ">
        {item?.products || 0}
      </span>
    ),
  },
];

export const userColumns = (navigate, t) => [
  {
    key: "id",
    title: t("id"),
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: t("name"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.name}</span>,
  },
  {
    key: "emai",
    title: t("email"),
    width: "225px",
    render: (item) => <span className="font-semibold">{item?.email}</span>,
  },
  {
    key: "phone",
    title: t("phone"),
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.phone}</span>,
  },
  {
    key: "status",
    title: t("status"),
    width: "175px",
    render: (item) => (
      <span className="font-semibold">
        {item?.is_active == 1 ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/customers/${item.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const storeColumns = (navigate, t) => [
  {
    key: "id",
    title: t("id"),
    width: "50px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "store_name",
    title: t("name"),
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.store_name}</span>,
  },
  {
    key: "store_owner_name",
    title: t("owner"),
    width: "100px",
    render: (item) => (
      <span
        className="font-semibold cursor-pointer"
        onClick={() => navigate(`/sellers/${item?.id}`)}
      >
        {item?.store_owner_name}
      </span>
    ),
  },
  {
    key: "address",
    title: t("address"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.address}</span>,
  },
  {
    key: "is_featured",
    title: t("is_featured"),
    width: "75px",
    render: (item) => (
      <span className="font-semibold">
        {item?.is_featured == 0 ? "no" : "yes"}
      </span>
    ),
  },
  {
    key: "description",
    title: t("description"),
    width: "300px",
    render: (item) => (
      <span className="font-semibold">{item?.description}</span>
    ),
  },
];

export const sellerColumns = (navigate, t) => [
  {
    key: "id",
    title: t("id"),
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: t("name"),
    width: "150px",
    render: (item) => (
      <span
        className="font-semibold cursor-pointer"
        onClick={() => navigate(`/customers/${item?.id}`)}
      >
        {item?.name}
      </span>
    ),
  },
  {
    key: "phone",
    title: t("phone"),
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.phone}</span>,
  },
  {
    key: "store_name",
    title: t("Store Name"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.store_name}</span>,
  },
  {
    key: "address",
    title: t("address"),
    width: "300px",
    render: (item) => <span className="font-semibold">{item?.address}</span>,
  },
  {
    key: "status",
    title: t("status"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.status}</span>,
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/sellers/${item.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const warningColumns = (editBtn, deleteBtn, t) => [
  {
    key: "id",
    title: t("Id"),
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "reason",
    title: t("Reason"),
    width: "700px",
    render: (item) => <span className="font-semibold">{item?.reason}</span>,
  },
  {
    key: "expires_at",
    title: t("Expire"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.expires_at}</span>,
  },
  {
    key: "level",
    title: t("Level"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.severity}</span>,
  },
  {
    key: "actions",
    title: t("Actions"),
    render: (item) => (
      <div className="flex gap-x-4">
        {editBtn && (
          <button onClick={() => editBtn(item)} aria-label="Edit">
            <FiEdit className="w-5 h-5" />
          </button>
        )}
        {deleteBtn && (
          <button onClick={() => deleteBtn(item)} aria-label="Delete">
            <FiTrash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    ),
  },
];

export const reportColumns = (deleteBtn, t) => [
  {
    key: "id",
    title: t("Id"),
    width: "75px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "type",
    title: t("Type"),
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.type}</span>,
  },
  {
    key: "reporting_user",
    title: t("Reporting User"),
    width: "150px",
    render: (item) => (
      <span className="font-semibold">{item?.reporting_user}</span>
    ),
  },
  {
    key: "date",
    title: t("Date"),
    width: "120px",
    render: (item) => <span className="font-semibold">{item?.date}</span>,
  },
  {
    key: "status",
    title: t("status"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.status}</span>,
  },
  {
    key: "priority",
    title: t("Priority"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.priority}</span>,
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "150px",
    render: (item) => (
      <div className="flex ">
        {deleteBtn && (
          <button onClick={() => deleteBtn(item)} aria-label="Delete">
            <FiTrash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    ),
  },
];

export const productColumns = (navigate, t ) => [
  {
    key: "id",
    title: t("Id"),
    width: "50px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "name",
    title: t("Name"),
    width: "125px",
    render: (item) => <span className="font-semibold">{item?.name}</span>,
  },
  {
    key: "sub_categories",
    title: t("Sub Categories"),
    width: "100px",
    render: (item) => (
      <span className="font-semibold ms-[40px]">
        {item?.sub_categories || 0}
      </span>
    ),
  },
  {
    key: "products",
    title: t("Products"),
    width: "100px",
    render: (item) => (
      <span className="font-semibold ms-[40px]">{item?.products || 0}</span>
    ),
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "300px",
    render: (item) => {
      return (
        <div className="flex gap-x-4">
          <button
            onClick={() => navigate(`/product-ads/${item?.id}`)}
            aria-label="View"
          >
            <FiEye className="w-5 h-5" />
          </button>
        </div>
      );
    },
  },
];

export const productadColumns = (navigate, t) => [
  {
    key: "id",
    title: t("Id"),
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: t("Title"),
    width: "225px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "price",
    title: t("Price && type"),
    width: "175px",
    render: (item) => (
      <span className="font-semibold">
        {item?.price} {item?.mainCurrency}
      </span>
    ),
  },
  {
    key: "final_price",
    title: t("final_price"),
    width: "150px",
    render: (item) => (
      <span className="font-semibold">
        {item?.final_price} {item?.mainCurrency}{" "}
      </span>
    ),
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "300px",
    render: (item) => {
      return (
        <div className="flex gap-x-4">
          <button
            onClick={() => navigate(`/product-details/${item?.id}`)}
            aria-label="View"
          >
            <FiEye className="w-5 h-5" />
          </button>
        </div>
      );
    },
  },
];

export const jobadColumns = (navigate, t) => [
  {
    key: "id",
    title: t("Id"),
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: t("Title"),
    width: "250px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "phone_number",
    title: t("phone number"),
    width: "200px",
    render: (item) => (
      <span className="font-semibold">{item?.phone_number}</span>
    ),
  },
  {
    key: "email",
    title: t("email"),
    width: "200px",
    render: (item) => <span className="font-semibold">{item?.email}</span>,
  },
  {
    key: "job_type",
    title: t("Job Type"),
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.job_type}</span>,
  },
  {
    key: "governorate",
    title: t("Governorate"),
    width: "150px",
    render: (item) => (
      <span className="font-semibold">{item?.governorate}</span>
    ),
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/job-ads/${item?.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const seekingadColumns = (navigate, t) => [
  {
    key: "id",
    title: t("Id"),
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: t("Title"),
    width: "250px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "phone_number",
    title: t("phone number"),
    width: "200px",
    render: (item) => (
      <span className="font-semibold">{item?.phone_number}</span>
    ),
  },
  {
    key: "email",
    title: t("email"),
    width: "200px",
    render: (item) => <span className="font-semibold">{item?.email}</span>,
  },
  {
    key: "job_type",
    title: t("Job Type"),
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.job_type}</span>,
  },
  {
    key: "governorate",
    title: t("Governorate"),
    width: "150px",
    render: (item) => (
      <span className="font-semibold">{item?.governorate}</span>
    ),
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/job-seeking/${item?.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const serviceColumns = (navigate, t) => [
  {
    key: "id",
    title: t("Id"),
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: t("Title"),
    width: "225px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "phone_number",
    title: t("phone"),
    width: "175px",
    render: (item) => (
      <span className="font-semibold">{item?.phone_number}</span>
    ),
  },
  {
    key: "email",
    title: t("email"),
    width: "175px",
    render: (item) => <span className="font-semibold">{item?.email}</span>,
  },
  {
    key: "days_hours",
    title: t("days_hours"),
    width: "175px",
    render: (item) => (
      <span className="font-semibold ms-[40px]">{item?.days_hours}</span>
    ),
  },
  {
    key: "price",
    title: t("price"),
    width: "175px",
    render: (item) => <span className="font-semibold ">{item?.price}</span>,
  },
  {
    key: "location",
    title: t("Governorate"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.location}</span>,
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "300px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/services-ads/${item?.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const offerColumns = (navigate, t) => [
  {
    key: "id",
    title: t("Id"),
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "offer_item",
    title: t("Ad"),
    width: "200px",
    render: (item) => (
      <span className="font-semibold">{item?.offer_item?.title}</span>
    ),
  },
  {
    key: "type",
    title: t("type"),
    width: "100px",
    render: (item) => <span className="font-semibold">{item?.type}</span>,
  },
  {
    key: "discount",
    title: t("discount"),
    width: "125px",
    render: (item) => (
      <span className="font-semibold ms-[30px]">{item?.discount}</span>
    ),
  },
  {
    key: "offer_on",
    title: t("Ad Type"),
    width: "125px",
    render: (item) => <span className="font-semibold">{item?.offer_on}</span>,
  },
  {
    key: "price",
    title: t("price"),
    width: "125px",
    render: (item) => (
      <span className="font-semibold">{item?.offer_item?.price}</span>
    ),
  },
  {
    key: "final_price",
    title: t("Final Price"),
    width: "125px",
    render: (item) => (
      <span className="font-semibold">{item?.offer_item?.final_price}</span>
    ),
  },
  {
    key: "actions",
    title: t("Actions"),
    width: "200px",
    render: (item) => (
      <div className="flex gap-x-4">
        <button
          onClick={() => navigate(`/offers/${item?.id}`)}
          aria-label="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

export const currencyColumns = (t) => [
  {
    key: "to_currency",
    title: t("Currency"),
    width: "150px",
    render: (item) => <span>{item.to_currency}</span>,
  },
  {
    key: "cost",
    title: t("price"),
    width: "150px",
    render: (item) => (
      <span className="font-semibold">{item.cost * item.rate}</span>
    ),
  },
  {
    key: "rate",
    title: t("Exchange Rate"),
    width: "150px",
    render: (item) => (
      <span>
        1 {item.from_currency} = {item.rate} {item.to_currency}
      </span>
    ),
  },
];

export const violationsColumns = (t) => [
  {
    key: "id",
    title: t("id"),
    width: "100px",
    render: (item) => <span>{item.id}</span>,
  },
  {
    key: "type",
    title: t("type"),
    width: "150px",
    render: (item) => <span className="font-semibold">{item.type}</span>,
  },
  {
    key: "notes",
    title: t("notes"),
    width: "150px",
    render: (item) => <span>1 {item.notes}</span>,
  },
  {
    key: "reported_at",
    title: t("reported_at"),
    width: "150px",
    render: (item) => <span className="font-semibold">{formatDate( new Date(item.reported_at) )}</span>,
  },
];
