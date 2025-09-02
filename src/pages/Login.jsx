import axios from "axios";
import Logo from "../assets/Logo.png";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { loginSchema } from "../utils/validator";
import useToastr from "../hooks/useToastr";
import { initialValues } from "../constants/admin";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const toastr = useToastr();
   const dispatch = useDispatch();
   const navigatet =  useNavigate()
   const { t } = useTranslation();

  const login = async (values , {resetForm} ) => {
    try {
      const response = await axios.post(
        "https://phplaravel-1483035-5732108.cloudwaysapps.com/api/login",
        values
      );
      console.log("done", response.data.success);
      // set the token in the auth Store
      dispatch(
        setCredentials({
          token: response.data.result.token,
          admin: response.data.result.user,
        })
      );
      navigatet('/')
      toastr("done", "success");

      resetForm();
    } catch (error) {
      toastr("Email or password are incorrect", "error");
      console.log(error)
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24  p-4">
        <div className="bg-white border border-gray-300 p-6 md:p-8 rounded-lg shadow-sm w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="flex justify-center mb-6 text-3xl">
            Bilal Elhaj
            {/* <img src={Logo} className="w-16" alt="" /> */}
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={login}
          >
            <Form className="flex flex-col gap-6">
              <div className="relative">
                <label>{t('email')} :</label>
                <Field name="email" type="email" className="field" />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="email"
                />
              </div>

              <div className="relative">
                <label>{t('password')} :</label>

                <Field name="password" type="password" className="field" />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="password"
                />
              </div>

              <button
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md   mt-2"
                type="submit"
              >
                {t('login')}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
