import { Dialog } from "@mui/material";
import useModalState from "@/hooks/use-form-manager";

export const FormContainer = ({
  modalType,
  name,
  setIdFunction,
  children,
}: any) => {
  const { modalState, modalActions } = useModalState();
  return modalType ? (
    <Dialog //TODO:revisar propiedades del tamaño del dialog
      fullWidth={modalType === "fullWith"}
      maxWidth={modalType === "fullWith" ? false : modalType}
      open={modalState === name}
      onClose={() => {
        modalActions.close, setIdFunction?.(null);
      }}
      scroll={"paper"}
    >
      {children}
    </Dialog>
  ) : (
    children
  );
};
