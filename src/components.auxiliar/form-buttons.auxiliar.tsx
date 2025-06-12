import { DialogActions } from "@mui/material";
import { memo, useCallback } from "react";
import { Button } from "@mui/material";

interface ButtonAction {
  text?: string;
  action: (values: any) => void;
  submitOnAction?: boolean;
}

interface FormButtonsProps {
  values: any;
  isValid: boolean;
  prevButton?: ButtonAction;
  nextButton?: ButtonAction;
  modalType?: string;
  editMode: boolean;
  applyButton?: boolean;
  hideButtons?: boolean;
  dataAction?: Array<{ label: string; action: (values: any) => void }>;
  formButtonAction: () => Promise<void>;
  modalActions: { close: () => void };
  setIdFunction?: (id: string | null) => void;
  prevDisabledFunction?: (values: any) => boolean;
  nextDisabledFunction?: (values: any) => boolean;
  applyDisabledFunction?: (values: any) => boolean;
  submitDisabledFunction?: (values: any) => boolean;
  acceptDisabledFunction?: (values: any) => boolean;
}

const FormButtons = memo(({
  values,
  isValid,
  prevButton,
  nextButton,
  modalType,
  editMode,
  applyButton,
  hideButtons,
  dataAction,
  formButtonAction,
  modalActions,
  setIdFunction,
  prevDisabledFunction,
  nextDisabledFunction,
  applyDisabledFunction,
  submitDisabledFunction,
  acceptDisabledFunction,
}: FormButtonsProps) => {
  const handleClose = useCallback(() => {
    modalActions.close();
    setIdFunction?.(null);
  }, [modalActions, setIdFunction]);

  const handlePrevClick = useCallback(() => {
    prevButton?.action(values);
  }, [prevButton, values]);

  const handleNextClick = useCallback(() => {
    if (nextButton?.submitOnAction) {
      formButtonAction().finally(() => nextButton?.action(values));
    } else {
      nextButton?.action(values);
    }
  }, [nextButton, formButtonAction, values]);

  const handleDataAction = useCallback((action: (values: any) => void) => {
    action(values);
  }, [values]);

  if (hideButtons) return null;

  return (
    <DialogActions sx={{ justifyContent: "space-between" }}>
      {prevButton && (
        <Button
          onClick={handlePrevClick}
          color="primary"
          variant="contained"
          disabled={prevDisabledFunction?.(values)}
        >
          {prevButton.text || "Anterior"}
        </Button>
      )}

      {modalType && (
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          Cancelar
        </Button>
      )}

      {dataAction?.map((action, index) => (
        <Button
          key={index}
          onClick={() => handleDataAction(action.action)}
          color="primary"
          variant="contained"
        >
          {action.label}
        </Button>
      ))}

      {nextButton && (
        <Button
          onClick={handleNextClick}
          disabled={nextDisabledFunction?.(values)}
          color="primary"
          variant="contained"
        >
          {nextButton.text || "Siguiente"}
        </Button>
      )}

      {!editMode && (applyButton === undefined || applyButton) && (
        <Button
          onClick={formButtonAction}
          disabled={
            applyDisabledFunction?.(values) ||
            submitDisabledFunction?.(values) ||
            !isValid
          }
          color="primary"
          variant="contained"
          id="applyButton"
        >
          Aplicar
        </Button>
      )}

      <Button
        onClick={formButtonAction}
        disabled={
          acceptDisabledFunction?.(values) ||
          submitDisabledFunction?.(values) ||
          !isValid
        }
        color="primary"
        variant="contained"
        id="acceptButton"
      >
        Aceptar
      </Button>
    </DialogActions>
  );
});

FormButtons.displayName = 'FormButtons';

export default FormButtons;
