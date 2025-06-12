// hooks/useGenericFormLogic.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { FormikErrors, FormikProps } from "formik";
import { initializeForm } from "../functions/init.controls";
import { normalize } from "../functions/utils";
import { submitValues } from "../functions/service.form";
import useModalState from "@/hooks/use-form-manager";
import NotificationProvider from "../components.form/notification-provider";
import { IGForm } from "../types/forms.types";

export const useGenericFormLogic = (props: IGForm) => {
  const {
    controls,
    endpointPath,
    idForEdit,
    connectionMode,
    getByIdFunction,
    submitFunction,
    setIdFunction,
    notifyValidation,
    name,
    modalType,
    setExternalErrors,
  } = props;

  const mode = import.meta.env.MODE !== "production";
  const formReference = useRef<FormikProps<any>>(null);
  const notify = props.notify ?? NotificationProvider();
  const { modalActions } = useModalState();

  const [initialFormData, setInitialFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState(null);
  const [dataSource, setDataSource] = useState<any>({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    initializeForm(
      controls,
      endpointPath,
      idForEdit,
      connectionMode,
      getByIdFunction
    ).then(({ initialFormData, validationSchema, dataSource, editMode }) => {
      setInitialFormData(initialFormData);
      setValidationSchema(validationSchema);
      setDataSource(dataSource);
      setEditMode(editMode);
    });
  }, [idForEdit]);

  const submit = useCallback(
    (values: any, event: any) =>
      submitFunction
        ? submitFunction({ ...values, editMode }, name, idForEdit, event)
        : submitValues({ ...values, editMode }, name, idForEdit, endpointPath),
    [idForEdit, editMode, submitFunction]
  );

  const formButtonAction = useCallback(
  async (event?: any) => {
    const form = formReference?.current;
    if (!form) return;

    const values = form.values;
    const message = await notifyValidation?.({ ...values, editMode });

    if (message) {
      notify({ type: "warning", title: message });
    } else {
      const { validateForm, setErrors, setFieldTouched, resetForm } = form;

      if (!validateForm || !setErrors || !setFieldTouched || !resetForm) return;

      const error: FormikErrors<any> = await validateForm();
      const errors = Object.keys(error);

      setExternalErrors?.((prev: any) => ({ ...(prev ?? {}), ...errors }));

      if (errors.length) {
        errors.forEach((key) => setFieldTouched(key));
        setErrors(error);
      } else {
        const response = await submit(normalize(values), event);

        if (response !== false) {
          if (event?.target?.id === "acceptButton") {
            modalActions.close();
            setIdFunction?.(null);
            !modalType && setEditMode(true);
          }
          if (event?.target?.id === "applyButton") {
            resetForm();
          }
        }
      }
    }
  },
  [editMode, notifyValidation, notify, submit, setIdFunction, setExternalErrors]
);


  return {
    initialFormData,
    validationSchema,
    dataSource,
    editMode,
    modalActions,
    formReference,
    formButtonAction,
    setEditMode,
  };
};
