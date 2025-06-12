import { IGenericControls } from "./controls.types";
import { SetStateAction } from "react";
import { SxProps } from "@mui/system";
/**
 * Formulario genérico con una serie de propiedades que describen cómo se comporta y se muestra el formulario en una aplicación.
 * @param name Nombre del formulario para identificarlo en la aplicación.
 * @param title Título del formulario.
 * @param editTitle Título del formulario cuando se está editando.
 * @param createTitle Título del formulario cuando se está creando.
 * @param endpointPath Ruta a donde se van a mandar los datos del formulario.
 * @param controls Array de controles que va a tener el formulario.
 * @param showSpecificDescription
 * @param idForEdit ID para controlar cuando se esta editando o creando un formulario a partir de un estado, seteando este id, si el id es null el formuario está creando y si es distinto de null está editando.
 * @param modalType Define el tamaño para el modal. El tipo de dato es un String que puede ser xs, sm, md, lg, xl, fullwith en dependencia del tamaño de la pantalla.
 * @param description Descripción del formulario cuando está creando.
 * @param descriptionOnCreate Descripción del formulario para cuando está creando y el idForEdit es null.
 * @param descriptionOnEdit Descripción del formulario para cuando está editando y el idForEdit es distinto de null.
 * @param applyButton Define si se va a mostrar el botón de aplicar.
 * @param connectionMode 
 * @param setIdFunction Esta función se encarga de setear el idForEdit.
 * @param submitFunction Función para mandar los datos del formulario.
 * @param getByIdFunction Accede a un formulario por su idForEdit.
 * @param hideButtons Oculta los botones de la interfaz.
 * @param nextButton Botón para llamar a una función como navegar y cambiar a la siguiente vista con datos ya cargados.
 * @param prevButton Botón para llamar a una función como navegar y cambiar a la vista anterior con datos ya cargados.
 * @param saveOnDirty
 * @param saveButton Define el texto del boton guardar.
 * @param updateButton Define el texto del boton actualizar.
 */
export type IGForm = {
  name: string;
  title?: string;
  editTitle?: string;
  createTitle?: string;
  endpointPath: string;
  controls: IGenericControls[];
  showSpecificDescription?: boolean;
  idForEdit?: string | number | null;
  modalType?: "xs" | "sm" | "md" | "lg" | "xl" | "fullWith";
  description?: string;
  descriptionOnCreate?: string;
  descriptionOnEdit?: string;
  applyButton?: boolean;
  connectionMode?: IConnectionMode;
  setIdFunction?: (idForEdit: any) => void;
  submitFunction?: (
    values: any,
    name: string,
    idForEdit: any,
    event: any
  ) => void;
  getByIdFunction?: (idForEdit: any) => any;
  hideButtons?: boolean;
  nextButton?: IFormAction;
  prevButton?: IFormAction;
  saveOnDirty?: boolean;
  saveButton?: string;
  updateButton?: string;
  dataAction?: { label: string; action: (values: any) => void }[];
  notifyValidation?: (values?: any) => Promise<string | void> | string | void;
  applyDisabledFunction?: (values?: any) => boolean;
  acceptDisabledFunction?: (values?: any) => boolean;
  submitDisabledFunction?: (values?: any) => boolean;
  nextDisabledFunction?: (values?: any) => boolean;
  prevDisabledFunction?: (values?: any) => boolean;
  setExternalErrors?: SetStateAction<any>;
  sx?: SxProps;
  gridContainerSx?: SxProps;
  notify?: (args: { type: string; title: string }) => void;
};
export type IConnectionMode =
  | "multiple"
  | "unified"
  | "grouped"
  | "onDemand"
  | undefined;
type IFormAction = {
  text: string;
  action: (values?: any) => void;
  submitOnAction?: boolean;
};
