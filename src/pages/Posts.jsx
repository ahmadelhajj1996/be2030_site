import { useMemo, useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import { FiEye , FiTrash2 } from "react-icons/fi";
import Table from "../components/display/Table";
import Container from "../components/layout/Container";
import Delete from "../components/feedback/Delete";
import { useGet, useDelete, usePost } from "../hooks/useApi";
import Modal from "../components/feedback/Modal";
import Form from "../components/form/Form";
import { ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const categoryColumns = (onDeleteClick , navigate) => [
  {
    key: "id",
    title: "الرقم التسلسلي",
    width: "150px",
    render: (item) => <span className="font-semibold">{item?.id}</span>,
  },
  {
    key: "image",
    title: "الصورة",
    width: "250px",
    render: (item) =>
      item?.image ? (
        <img
          src={`https://phplaravel-1483035-5810347.cloudwaysapps.com/storage/${item.image}`}
          alt={item?.title || "صورة"}
          className="w-12 h-12 object-cover rounded"
          loading="lazy"
        />
      ) : (
        <span className="text-gray-400">لا توجد صورة</span>
      ),
  },
  {
    key: "title",
    title: "الاسم",
    width: "600px",
    render: (item) => <span className="font-semibold">{item?.title}</span>,
  },
  {
    key: "category",
    title: "التصنيف",
    width: "200px",
    render: (item) => <span className="font-semibold">{item?.category}</span>,
  },
  {
    key: "actions",
    title: "الإجراءات",
    width: "400px",
    render: (item) => (
      <div className="flex gap-x-8">
        <button
          onClick={() => navigate(`/posts/${item.id}`)}
          aria-label="حذف"
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <FiEye className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeleteClick(item)}
          aria-label="حذف"
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <FiTrash2 className="w-5 h-5 text-red-500" />
        </button>
      </div>
    ),
  },
];

const initialPostValues = {
  title: "",
  category_id: '',
  image: null,
};

const postSchema = Yup.object().shape({
  title: Yup.string().required("مطلوب"),
  category_id: Yup.number().required("مطلوب"),
  image: Yup.mixed()
    .required("الصورة مطلوبة")
    .test("fileSize", "حجم الملف كبير جداً (الحد الأقصى 5MB)", (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024; // 5MB max
    })
    .test("fileType", "نوع الملف غير مدعوم (JPEG, PNG, GIF فقط)", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
    }),
});

function Posts() {
  const [modal, setModal] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const navigate =  useNavigate()
  const { data:categories, isFetched : categoriesFetched } = useGet(["categories"], "categories", {
    staleTime: 5 * 60 * 1000,
  });



  // Fetch posts
  const { data, isFetched ,  isLoading, isError, error } = useGet(["posts"], "posts", {
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: deleteItem } = useDelete({
    invalidateQueries: ["posts"],
    onSuccess: () => {
      toast.success("تم الحذف بنجاح");
    },
    onError: (error) => {
      toast.error("فشل في الحذف");
      console.error("Delete error:", error);
    },
  });

  const { mutate: addPost, isLoading: isAdding } = usePost({
    invalidateQueries: ["posts"],
    onSuccess: () => {
      toast.success("تم الإضافة بنجاح");
      setModal("");
    },
    onError: (error) => {
      toast.error("فشل في الإضافة");
      console.error("Error adding post:", error);
    },
  });

  const normalizedPosts = useMemo(() => {
    if (!data) return [];
    return data.map((post) => ({
      id: post.id,
      title: post.title,
      category: post.category?.title || "بدون تصنيف",
      image: post.image,
    }));
  }, [data]);

  const handleDeleteClick = useCallback((item) => {
    setCurrentItem(item);
    setModal("delete");
  }, []);

  const handleDelete = useCallback(() => {
    if (!currentItem?.id) return;
    deleteItem({ url: `posts/${currentItem.id}` });
    setModal("");
    setCurrentItem(null);
  }, [currentItem, deleteItem]);

  const handleAddPost = (values, { setSubmitting, resetForm }) => {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category_id", values.category_id);

    if (values.image) {
      formData.append("image", values.image);
    }

    addPost(
      {
        url: "posts",
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      },
      {
        onSettled: () => {
          setSubmitting(false);
          resetForm();
        },
      }
    );
  };

  const columns = useMemo(
    () => categoryColumns(handleDeleteClick, navigate),
    [handleDeleteClick, navigate]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        جاري التحميل...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        حدث خطأ: {error.message}
      </div>
    );
  }

  return (
    <>
      <Container
        title={"كل المنشورات"}
        additionalHeaderContent={
          <button
            onClick={() => setModal("add")}
            aria-label="إضافة"
            className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
          >
            <MdAdd className="w-6 h-6" />
          </button>
        }
      >
        {isFetched && categoriesFetched && (
          <Table
            columns={columns}
            data={normalizedPosts}
            pageSize={10}
            pagination={true}
            emptyMessage={"لا توجد منشورات"}
            loading={isLoading}
          />
        )}
      </Container>

      <Modal
        isOpen={modal === "add"}
        onClose={() => {
          setModal("");
        }}
        className="w-full max-w-md"
      >
        <Form
          initialValues={initialPostValues}
          validationSchema={postSchema}
          onSubmit={handleAddPost}
          onClose={() => {
            setModal("");
          }}
          formClassName="flex flex-col gap-y-6"
          submitButtonText={isAdding ? "جاري الإضافة..." : "إضافة"}
          isSubmitting={isAdding}
        >
          <h2 className="font-normal text-lg mb-4">إضافة منشور جديد</h2>

          <div className="relative">
            <label htmlFor="title" className="block mb-2 font-medium">
              العنوان:
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              className="field w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              component="div"
              className="error-message text-red-500 text-sm mt-1"
              name="title"
            />
          </div>

          <div className="relative">
            <label htmlFor="category_id" className="block mb-2 font-medium">
              التصنيف:
            </label>
            <Field
              id="category_id"
              name="category_id"
              as="select"
              className="field w-full p-2 border border-gray-300 rounded"
            >
              <option value={""}>اختر الصنف</option>

              {categoriesFetched &&
                categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
            </Field>
            <ErrorMessage
              component="div"
              className="error-message text-red-500 text-sm mt-1"
              name="category_id"
            />
          </div>

          <div className="relative">
            <label htmlFor="image" className="block mb-2 font-medium">
              الصورة:
            </label>
            <Field name="image">
              {({ field, form }) => (
                <input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(event) => {
                    form.setFieldValue(
                      field.name,
                      event.currentTarget.files[0]
                    );
                  }}
                  className="field w-full p-2 border border-gray-300 rounded"
                />
              )}
            </Field>
            <ErrorMessage
              component="div"
              className="error-message text-red-500 text-sm mt-1"
              name="image"
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

export default Posts;
