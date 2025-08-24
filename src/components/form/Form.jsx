import PropTypes from "prop-types";
import { Formik, Form as FormikForm } from "formik";
import Button from "../layout/Button";
import { useTranslation } from "react-i18next";

const Form = ({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  onClose,
  formClassName = "",
  formProps = {},
  formikProps = {},
  title = "",
  outerClassName = "",
  headerClassName = "",
  titleClassName = "",
  buttonClass = " ",
  cancel = true,
  submitButtonText = 'save',
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${outerClassName}`}>
      {title && (
        <div className={`mb-6 ${headerClassName}`}>
          {title && (
            <h5 className={`text-lg font-normal text-center ${titleClassName}`}>
              {t(title)}
            </h5>
          )}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        {...formikProps}
      >
        {() => (
          <FormikForm className={`  ${formClassName}`} {...formProps}>
            {children}

            <div className={` flex gap-x-8 inset-x-1/4  ${buttonClass}`}>
              <Button className=" w-[200px] ">{submitButtonText}</Button>
              {cancel && (
                <Button type="reset" onClick={onClose} className="w-[200px]">
                  {t("form.cancel")}
                </Button>
              )}
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  formClassName: PropTypes.string,
  formProps: PropTypes.object,
  formikProps: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  submitButtonText: PropTypes.string,
  submitButtonClassName: PropTypes.string,
  buttonClass: PropTypes.string,
  resetButtonText: PropTypes.string,
  resetButtonClassName: PropTypes.string,
  showResetButton: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  outerClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  descriptionClassName: PropTypes.string,
  buttonsContainerClassName: PropTypes.string,
  customButtons: PropTypes.node,
  cancel: PropTypes.bool,
};

export default Form;
