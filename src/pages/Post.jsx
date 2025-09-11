import { IoMdArrowBack } from "react-icons/io";
import { useGet, usePost } from "../hooks/useApi";
import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
// Note: You'll need to install and import toast and redux hooks
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

function Parts() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // Define validation schema inside component using useMemo
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required("الاسم مطلوب"),
        email: yup
          .string()
          .email("صيغة البريد الإلكتروني غير صالحة")
          .required("البريد الإلكتروني مطلوب"),
        message: yup.string().required("الرسالة مطلوبة"),
      }),
    []
  );

  const initialValues = {
    name: "",
    email: "",
    message: "",
    post_id: id, // This will be included in the form data
  };

  const queryKey = useMemo(() => ["posts", id], [id]);
  const selectFunction = useMemo(
    () => (data) => data.find((e) => e.id == id),
    [id]
  );

  const { data } = useGet(queryKey, "posts", {
    staleTime: 5 * 60 * 1000,
    select: selectFunction,
    enabled: !!id,
  });

  const { mutate: addComment, isLoading: isSubmitting } = usePost({
    invalidateQueries: ["likes"],
    onSuccess: () => {
      // toast.success("تم إرسال التعليق بنجاح");
      console.log("Comment submitted successfully");
    },
    onError: (error) => {
      // toast.error("فشل في إرسال التعليق");
      console.error("Error submitting comment:", error);
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    addComment(
      {
        url: "likes",
        data: values, // This includes all form fields including post_id
      },
      {
        onSuccess: () => {
          resetForm();
        },
      }
    );
  };

  return (
    <div className="h-screen overflow-y-auto" dir="rtl">
      <div className="w-full max-w-6xl mx-auto p-8 md:p-12">
        <div>
          <IoMdArrowBack
            className="w-7 h-7 rotate-180 text-[#b9a779] mb-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="m-4 sm:m-8 flex flex-col gap-y-12">
            {data?.parts?.map((item) => (
              <div key={item.id} className="flex flex-col gap-y-3">
                <p className="text-md text-[#b9a779]">{item.title}</p>
                <p className="text-sm ps-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting: formikSubmitting }) => (
            <Form className="flex flex-col gap-y-4 mt-24 px-4 md:px-8 text-[#b9a779] mb-12">
              <h3 className="text-lg font-medium">اكتب تعليقا</h3>

              <div className="relative">
                <label htmlFor="name" className="block mb-1">
                  الاسم الكامل:
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="field w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  component="div"
                  className="error-message text-red-500 text-sm mt-1"
                  name="name"
                />
              </div>

              <div className="relative">
                <label htmlFor="email" className="block mb-1">
                  البريد الالكتروني:
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="field w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  component="div"
                  className="error-message text-red-500 text-sm mt-1"
                  name="email"
                />
              </div>

              <div className="relative">
                <label htmlFor="message" className="block mb-1">
                  التعليق:
                </label>
                <Field
                  id="message"
                  as="textarea"
                  name="message"
                  rows={4}
                  className="field w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  component="div"
                  className="error-message text-red-500 text-sm mt-1"
                  name="message"
                />
              </div>

              <button
                className="w-[200px] mx-auto py-2 bg-[#b9a779] text-white font-medium rounded-md mt-2 disabled:opacity-50"
                type="submit"
                disabled={formikSubmitting || isSubmitting}
              >
                {formikSubmitting || isSubmitting ? "جاري الارسال..." : "ارسال"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Parts;
