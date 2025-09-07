import { useMemo, useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import Table from "../components/display/Table";
import Container from "../components/layout/Container";
import Delete from "../components/feedback/Delete";
import { useGet, useDelete, usePost } from "../hooks/useApi";
import Modal from "../components/feedback/Modal";
import Form from "../components/form/Form";
import { ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const categoryColumns = (onDeleteClick) => [
  {
    key: "id",
    title: "الرقم التسلسلي",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "title",
    title: "الاسم",
    width: "425px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  // {
  //   key: "description",
  //   title: "الوصف",
  //   width: "350px",
  //   render: (item) => (
  //     <span className="font-semibold">{item?.description}</span>
  //   ),
  // },
  {
    key: "actions",
    title: "الإجراءات",
    width: "400px",
    render: (item) => (
      <div className="flex gap-x-8">
        <button onClick={() => onDeleteClick(item)} aria-label="حذف">
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

const initialCategoryValues = {
  title: "",
  description: "",
};

const categorySchema = Yup.object().shape({
  title: Yup.string().required("مطلوب"),
  description: Yup.string().required("مطلوب"),
});

function Categories() {
  const [modal, setModal] = useState("");
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch categories
  const { data, isLoading } = useGet(["categories"], "categories", {
    staleTime: Infinity,
  });

  const { mutate: deleteItem } = useDelete({
    invalidateQueries: ["categories"],
  });

  const { mutate: addCategory } = usePost({
    invalidateQueries: ["categories"],
    onSuccess: () => {
      console.log("Category added successfully");
      setModal("");
    },
    onError: (error) => {
      console.error("Error adding category:", error);
    },
  });

  const normalizedCategories = useMemo(() => {
    if (!data) return [];
    return data.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
    }));
  }, [data]);

  // Handle delete button click
  const handleDeleteClick = (item) => {
    setCurrentItem(item);
    setModal("delete");
  };

  // Handle confirm delete
  const handleDelete = useCallback(() => {
    if (!currentItem?.id) return;
    deleteItem({ url: `categories/${currentItem.id}` });
    setModal("");
  }, [currentItem, deleteItem]);

  // Handle add category - FIXED
  const handleAddCategory = (values, { resetForm }) => {
    addCategory({
      url: "categories", // Add the URL here
      data: values, // Pass the form data
      config: {}, // Optional config
    });
    resetForm();
  };

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(() => categoryColumns(handleDeleteClick), []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        جاري التحميل...
      </div>
    );
  }

  

  return (
    <>
      <Container
        title={"كل التصنيفات"}
        additionalHeaderContent={
          <button
            onClick={() => setModal("add")}
            aria-label="إضافة"
            className="w-7 h-7"
          >
            <MdAdd className="w-7 h-7" />
          </button>
        }
      >
        <div className="w-1/2">
          <Table
            columns={columns}
            data={normalizedCategories}
            pageSize={10}
            pagination={true}
            emptyMessage={"لا توجد تصنيفات"}
            loading={isLoading}
          />
        </div>
      </Container>

      <Modal
        isOpen={modal === "add"}
        onClose={() => {
          setModal("");
        }}
        className="w-1/2"
      >
        <Form
          initialValues={initialCategoryValues}
          validationSchema={categorySchema}
          onSubmit={handleAddCategory}
          onClose={() => setModal("")}
          formClassName="flex flex-col gap-y-6"
          submitButtonText={"إضافة"}
        >
          <h2 className="font-normal text-lg mb-4">إضافة تصنيف جديد</h2>

          <div className="relative">
            <label>الاسم:</label>
            <Field name="title" type="text" className="field" />
            <ErrorMessage
              component="div"
              className="error-message"
              name="title"
            />
          </div>

          <div className="relative">
            <label>الوصف:</label>
            <Field
              name="description"
              as="textarea"
              className="field"
              rows={5}
            />
            <ErrorMessage
              component="div"
              className="error-message"
              name="description"
            />
          </div>
        </Form>
      </Modal>

      <Delete
        isOpen={modal === "delete"}
        onClose={() => {
          setModal("");
          setCurrentItem(null);
        }}
        onConfirm={handleDelete}
        action={"حذف"}
        itemName={currentItem?.title}
      />
    </>
  );
}

export default Categories;
