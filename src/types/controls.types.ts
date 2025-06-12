import {
  IChecks,
  ICommonProps,
  ICustomIcons,
  IInputProps,
  IMultipleOptionsProps,
  IOnChangeFunction,
  IOptionsProps,
  IRadios,
  ITimeControls,
  IconColor,
  IconNames,
} from "./common.types";
import {
  IDateValidation,
  IMultiSelectValidation,
  INumberValidation,
  IRadioValidations,
  IRatingValidations,
  ISelectValidation,
  ISliderValidations,
  ITextValidation,
} from "./validation.types";

export type IGenericControls =
  | IScanner
  | ITextField
  | ISelect
  | IMultiSelect
  | INumberField
  | IAutocomplete
  | IDatePicker
  | ITimePicker
  | IRadio
  | ICheck
  | ISwitch
  | ISlider
  | IRating
  | ICustomComponent;
/**
 * Campo de texto con opciones como patrón de validación, validaciones personalizadas, visibilidad oculta y capacidad multilinea.
 * @param type Tipo de control a crear. Debe ser "text".
 * @param pattern Patrón de validación para el campo usando expresiones regulares.
 * @param validations Validaciones personalizadas para el campo de texto.
 * @param hidden Opción para ocultar el campo.
 * @param multiline Opción para permitir múltiples líneas de texto en el campo.
 */
export type ITextField = {
  type: "text";
  pattern?: RegExp;
  validations?: ITextValidation;
  hidden?: any;
  multiline?: multiline;
} & IInputProps;
type multiline =
  | {
      minRows?: number;
      maxRows?: number;
    }
  | boolean;
/**
 * Un escáner con una función de análisis y opciones comunes como propiedades.
 * @param type Tipo de control que desea crear. Debe ser "scanner".
 * @param parseFunction Función de análisis para el scanner.
 * @param closeOnScan Indica si el scanner debe cerrarse después de escanear.
 */
export type IScanner = {
  type: "scanner";
  parseFunction: (scannerResult: any) => Record<string, any>;
  closeOnScan: boolean;
} & ICommonProps;
/**
 * Un campo que acepta un número de teléfono o una dirección de correo electrónico con opciones de validación.
 * @param type Tipo de control que desea crear. Debe ser "phoneOrEmail".
 * @param validations Validaciones específicas para números de teléfono o correos electrónicos.
 */
export type IPhoneOrEmail = {
  type: "phoneOrEmail";
  validations?: IPhoneOrEmail;
} & IInputProps;
/**
 * Un campo numérico con opciones de formato, máscara, escala decimal, prefijo, validaciones y más.
 * @param type Tipo de control que desea crear. Debe ser "number".
 * @param format Formato del valor. Puede ser units, finance u other.
 * @param mask Una cadena que representa la máscara del campo numérico.
 * @param decimalScale El número de dígitos después del punto decimal.
 * @param fixDecimalSeparator Booleano que indica si se debe corregir el separador decimal.
 * @param avoidSeparator Booleano que indica si se debe evitar el separador de miles.
 * @param prefix Prefijo para el campo numérico.
 * @param validations Validaciones específicas para el campo numérico.
 * @param negativeValues Booleano que indica si se permiten valores negativos.
 */
export type INumberField = {
  type: "number";
  format: "units" | "finance" | "other";
  mask?: string;
  decimalScale?: number;
  fixDecimalSeparator?: boolean;
  avoidSeparator?: boolean;
  prefix?: string;
  validations?: INumberValidation;
  negativeValues?: boolean;
} & IInputProps;
/**
 * Un campo de selección con opciones de validación, valores de verificación, y más.
 * @param type Tipo de control que desea crear. Debe ser "select".
 * @param validations Validaciones específicas para el campo de selección.
 * @param checkValues Arreglo de valores para verificar.
 * @param useRef Referencia de uso.
 * @param showDelete Booleano que indica si se debe mostrar la opción de eliminación.
 */
export type ISelect = {
  type: "select";
  validations?: ISelectValidation;
  checkValues?: any[];
  useRef?: any;
  showDelete?: boolean;
} & IOptionsProps;
/**
 * Un campo de selección múltiple con opciones de validación y propiedades de selección múltiple.
 * @param type Tipo de control que desea crear. Debe ser "multiselect".
 * @param validations Validaciones específicas para el campo de selección.
 * @param checkValues Arreglo de valores para verificar.
 * @param useRef Referencia de uso.
 */
export type IMultiSelect = {
  type: "multiselect";
  validations?: IMultiSelectValidation;
  checkValues?: any[];
  useRef?: any;
} & IMultipleOptionsProps &
  IOptionsProps;
/**
 * Un campo de autocompletar con opciones de validación y texto de carga.
 * @param type Tipo de control que desea crear. Debe ser "autocomplete".
 * @param validations Validaciones específicas para el campo de selección.
 * @param loadingText 
 */
export type IAutocomplete = {
  type: "autocomplete";
  validations?: ISelectValidation;
  loadingText?: string;
} & IOptionsProps;
/**
 * Un selector de fecha con opciones de validación y controles de tiempo.
 * @param type Tipo de control que desea crear. Debe ser "date".
 * @param validations Validaciones específicas para el campo de selección.
 */
export type IDatePicker = {
  type: "date";
  validations?: IDateValidation;
} & ITimeControls;
/**
 * Un selector de tiempo con opciones de validación.
 * @param type Tipo de control que se desea crear. Debe ser "time".
 * @param validations Validaciones específicas para el campo de selección.
 */
export type ITimePicker = {
  validations?: IDateValidation;
  type: "time";
} & ITimeControls;
/**
 * Un grupo de botones de radio con opciones de dirección, etiqueta, validaciones, y más.
 * @param type Tipo de control que se desea crear. Debe ser "radio".
 * @param direction Dirección en que se van a mostrar los datos. Puede ser "row" o "col".
 * @param labelPlacement Posición en que se van a mostrar los datos.
 * @param radios 
 * @param validations Validaciones específicas para el campo de selección.
 * @param url 
 * @param defaultValue Valor predeterminado para un componente de casilla de verificación.
 * @param onChangeCallback 
 */
export type IRadio = {
  type: "radio";
  direction?: "row" | "col";
  labelPlacement?: "top" | "start" | "bottom" | "end";
  radios?: IRadios[];
  validations?: IRadioValidations;
  url?: string;
  defaultValue?: string;
  onChangeCallback?: IOnChangeFunction;
} & ICommonProps;
/**
 * Un botón de verificación con opciones de iconos personalizados y verificación.
 * @param type Tipo de control que se desea crear. Debe ser "check".
 */
export type ICheck = {
  type: "check";
} & IChecks &
  ICustomIcons;
/**
 * Un interruptor de selección con opciones de verificación.
 * @param type Tipo de control que se desea crear. Debe ser "switch".
 */
export type ISwitch = {
  type: "switch";
} & IChecks;
/**
 * Un control de calificación con opciones de precisión, valor máximo, colores y validaciones.
 * @param type Tipo de control que desea crear. Debe ser "rating".
 * @param precision
 * @param max
 * @param color
 * @param defaultValue Valor predeterminado para un componente de casilla de verificación.
 * @param validations Validaciones específicas para el campo de selección.
 */
export type IRating = {
  type: "rating";
  precision?: boolean;
  max?: number;
  color?: IconColor;
  defaultValue?: number;
  validations?: IRatingValidations;
} & ICommonProps &
  ICustomIcons;
/**
 * Un control deslizante con opciones de marcadores, valores iniciales y máximos, y validaciones.
 * @param type Tipo de control que desea crear. Debe ser "slider".
 * @param startIcon
 * @param endIcon
 * @param step
 * @param mark
 * @param min
 * @param defaultValue Valor predeterminado para un componente de casilla de verificación.
 * @param max
 * @param validations Validaciones específicas para el campo de selección.
 * @param valueLabelDisplay
 */
export type ISlider = {
  type: "slider";
  startIcon?: IconNames;
  endIcon?: IconNames;
  step?: number;
  mark?: boolean;
  min: number;
  defaultValue?: number;
  max: number;
  validations?: ISliderValidations;
  valueLabelDisplay?: "auto" | "on" | "off";
} & ICommonProps;
/**
 * Un componente personalizado con opciones de validación y propiedades dinámicas.
 * @param type Tipo de control que desea crear. Debe ser "component".
 */
export type ICustomComponent = {
  type: "component";
  // validations?:
  //   | ISliderValidations
  //   | IRatingValidations
  //   | ITextValidation
  //   | INumberValidation
  //   | ISelectValidation
  //   | IDateValidation
  //   | IRadioValidations;
  component: (props: {
    id?: any;
    initialValue?: any;
    gridValues?: any;
    name?: any;
    label?: any;
    disabled?: any;
    hidden?: any;
    sx?: any;
    component?: any;
    validations?: any;
    formValue?: any;
    error?: any;
    setFieldValue?: any;
  }) => any;
} & ICommonProps;
