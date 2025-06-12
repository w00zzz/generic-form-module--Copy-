// components/GenericForm.tsx
import {
  Box,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import { FormContainer } from "../components.auxiliar/form-container.auxiliar";
import { GForm } from "../components.auxiliar/control-item.auxiliar";
import { GridContainer } from "../components.auxiliar/grid-container.auxiliar";
import FormButtons from "@/components.auxiliar/form-buttons.auxiliar";
import Loading from "./loading";
import { object } from "yup";
import { useGenericFormLogic } from "../hooks/useGenericFormLogic";
import { IGForm } from "../types/forms.types";

const GenericForm = (props: IGForm) => {
  const {
    title,
    editTitle,
    createTitle,
    name,
    description,
    modalType,
    showSpecificDescription,
    descriptionOnCreate,
    descriptionOnEdit,
    controls,
    hideButtons,
    prevButton,
    nextButton,
    applyButton,
    dataAction,
    sx,
    gridContainerSx,
    acceptDisabledFunction,
    applyDisabledFunction,
    nextDisabledFunction,
    prevDisabledFunction,
    submitDisabledFunction,
  } = props;

  const {
    initialFormData,
    validationSchema,
    dataSource,
    editMode,
    modalActions,
    formReference,
    formButtonAction,
  } = useGenericFormLogic(props);

  const customDescription = showSpecificDescription
    ? editMode
      ? descriptionOnEdit ?? description
      : descriptionOnCreate ?? description
    : description;

  const customTitle =
    editTitle || createTitle ? (editMode ? editTitle : createTitle) : title;

  return initialFormData && validationSchema && formReference ? (
    <FormContainer modalType={modalType} name={name} setIdFunction={props.setIdFunction}>
      {customTitle && <DialogTitle>{customTitle}</DialogTitle>}
      {customDescription && <DialogContentText mx={3}>{customDescription}</DialogContentText>}

      <Formik
        className="formik-object"
        validateOnChange={true}
        initialValues={initialFormData}
        validationSchema={object().shape(validationSchema)}
        onSubmit={() => {}} // El onSubmit se maneja manualmente
        innerRef={formReference}
        validateOnMount={false}
        validateOnBlur={false}
      >
        {(formikProps: FormikProps<any>) => {
          const { values, isValid } = formikProps;

          return (
            <>
              <DialogContent dividers={!!modalType} sx={sx}>
                <GridContainer hideButtons={hideButtons} sx={gridContainerSx}>
                  <GForm
                    controlArray={controls}
                    dataSource={dataSource}
                    editMode={editMode}
                    initialValue={initialFormData}
                  />
                </GridContainer>
              </DialogContent>

              <Box sx={{ flexGrow: 1 }} />

              {!hideButtons && (
                <FormButtons
                  values={values}
                  isValid={isValid}
                  prevButton={prevButton}
                  nextButton={nextButton}
                  modalType={modalType}
                  editMode={editMode}
                  applyButton={applyButton}
                  hideButtons={hideButtons}
                  dataAction={dataAction}
                  formButtonAction={formButtonAction}
                  modalActions={modalActions}
                  setIdFunction={props.setIdFunction}
                  prevDisabledFunction={prevDisabledFunction}
                  nextDisabledFunction={nextDisabledFunction}
                  applyDisabledFunction={applyDisabledFunction}
                  submitDisabledFunction={submitDisabledFunction}
                  acceptDisabledFunction={acceptDisabledFunction}
                />
              )}
            </>
          );
        }}
      </Formik>
    </FormContainer>
  ) : (
    <Loading />
  );
};

export default GenericForm;
