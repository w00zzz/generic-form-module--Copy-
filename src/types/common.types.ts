import * as Colors from "@mui/material/colors";
import * as Icons from "@mui/icons-material";

import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";

/**
 * Representa el nombre de los iconos en MUI.
 */
export type IconNames = keyof typeof Icons;
/**
 * Representa los colores disponibles en la paleta de colores de MUI.
 */
export type IconColor = keyof typeof Colors;
/**
 * Define las propiedades para un componente de icono.
 * @param iconName Nombre del icon.
 */
export type IconProps = {
  iconName: IconNames;
};
/**
 * Representa las propiedades comunes que pueden tener los componentes.
 * @param name Nombre del componente.
 * @param label Etiqueta descriptiva del componente.
 * @param id Identificador único para el componente.
 * @param placeholder Texto del marcador de posición para un componente de entrada.
 * @param sx Propiedades de estilos personalizadas para un componente.
 * @param gridValues Valores de la cuadrícula para el diseño del componente en diferentes tamaños de pantalla y lograr que sea responsive.
 * @param gridSx Estilos personalizados para la cuadrícula del componente.
 * @param disabled Especifica si el componente está activado o desactivado.
 * @param hidden Especifica si el componente está oculto.
 * @param onChange Función que se llama cuando ocurre algún cambio en el componente.
 * @param options Este objeto define opciones adicionales que se le pueden pasar al componente.
 * @param disabledOnEdit Establece que el componente se desabilite cuando se está editando el componente.
 */
export type ICommonProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  sx?: SxProps;
  gridValues?: IGridValues;
  gridSx?: SxProps;
  disabled?: IDisableFunction;
  hidden?: IDisableFunction;
  onChange?: IOnChangeFunction;
  options?: Object;
  disabledOnEdit?: boolean;
};

/**
 * Extiende de ICommonProps y añade propiedades especificas para componentes de opciones, como agrupamiento, valores predeterminados, urls.
 * @param group Indica si las opciones del componente están agrupadas.
 * @param options Array de opciones para el componente.
 * @param defaultValue Valor predeterminado para un componente. Puede ser un String o un array de String.
 * @param url URL asociada a un componente.
 */
export type IOptionsProps = ICommonProps & {
  group?: boolean;
  options?: any[];
  defaultValue?: string | string[];
  url?: string;
};
/**
 * Define las opciones para componentes que permiten múltiples selecciones, como listas de selección multiple.
 */
export type IMultipleOptionsProps = {
  multiple: "native" | "check" | "chips";
};
/**
 * Define propiedades especificas para componentes de entrada, como color, ancho completo, enfoque.
 * @param color Color del componente.
 * @param fullWidth Indica si un componente debe ocupar todo el ancho posible.
 * @param focused Indica si un componente debe estar enfocado.
 * @param defaultValue Valor predeterminado para un componente.
 */
export type IInputProps = ICommonProps & {
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  fullWidth?: boolean;
  focused?: boolean;
  defaultValue?: string;
};
/**
 * Proporciona propiedades para controles relacionados con el tiempo, como limitar a fechas pasadas o futuras, fecha máxima y mínima.
 * @param disableFuture Indica si se deben deshabilitar las fechas futuras para un componente relacionado con el tiempo.
 * @param disablePast Indica si se deben deshabilitar las fechas pasadas para un componente relacionado con el tiempo.
 * @param maxDate Fecha máxima permitida para un componente relacionado con el tiempo.
 * @param minDate Fecha mínima permitida para un componente relacionado con el tiempo.
 * @param defaultValue Valor predeterminado para un componente.
 */
export type ITimeControls = ICommonProps & {
  disableFuture?: boolean;
  disablePast?: boolean;
  maxDate?: string;
  minDate?: string;
  defaultValue?: string;
  //localeText
};
/**
 * Define las propiedades específicas para componentes de radio.
 * @param denominacion Etiqueta asociada a la opción del componente.
 * @param idconcepto ID identificador de la denominación.
 */
export type IRadios = {
  denominacion: string;
  idconcepto: string;
};
/**
 * Define las propiedades para componentes de casillas de verificación, como la ubicación de la etiqueta o el color.
 * @param labelPlacement Posición de la etiqueta para un componente de casilla de verificación.
 * @param color Color para un componente, puede ser un valor hexadecimal o un color de icono.
 * @param defaultValue Valor predeterminado para un componente de casilla de verificación.
 */
export type IChecks = ICommonProps & {
  labelPlacement?: "top" | "start" | "bottom" | "end";
  color?: ColorValueHex | IconColor;
  defaultValue?: boolean;
};
/**
 * Define la posibilidad de incluir iconos personalizados en un componente.
 * @param customIcons Iconos personalizados para un componente.
 */
export type ICustomIcons = {
  customIcons?: IAlternateIcons;
};
/**
 * Función que devuelve un booleano para determinar si una funcionalidad debe estar deshabilitada.
 */
export type IDisableFunction = (args?: any) => boolean;
/**
 * Función que se invoca cuando ocurre un evento de cambio.
 */
export type IOnChangeFunction = (event?: any, refs?: any) => void;
/**
 * Define un diccionario que mapea nombres de controles a funciones que generan componentes.
 */
export type ControlDictionary = Record<EControls, (props: any) => any>;
/**
 * Representa un valor de color en formato hexadecimal.
 */
export type ColorValueHex = `#${string}`;
/**
 * Enumeración de los diferentes tipos de controles disponibles, como escáner, texto, número, etc.
 */
export type EControls =
  | "scanner"
  | "text"
  | "number"
  | "select"
  | "multiselect"
  | "autocomplete"
  | "date"
  | "time"
  | "radio"
  | "check"
  | "switch"
  | "slider"
  | "rating"
  | "component";
/**
 * Enumeración de los tipos de controles que se pueden validar.
 */
export type EControlsForValidate =
  | "text"
  | "number"
  | "select"
  | "autocomplete"
  | "multiselect"
  | "date"
  | "time"
  | "radio"
  | "check"
  | "switch"
  | "slider"
  | "component"
  | "rating";
/**
 * Define un par de iconos alternativos, como un icono contorneado y un icono relleno.
 */
type IAlternateIcons = {
  outlinedIcon: IconNames;
  filledIcon: IconNames;
};
/**
 * Define los valores de la cuadrícula para diferentes tamaños de pantalla, como extra pequeño, pequeño, mediano, grande y extra grande.
 */
export type IGridValues = {
  xs?: IBreakPointsValues;
  sm?: IBreakPointsValues;
  md?: IBreakPointsValues;
  lg?: IBreakPointsValues;
  xl?: IBreakPointsValues;
};
/**
 * Define los valores de los puntos de quiebre para las cuadrículas, que van del 1 al 12 para ajustar el diseño en diferentes tamaños de pantalla.
 */
type IBreakPointsValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
