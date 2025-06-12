import type { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
/**
 * Esta interfaz describe la estructura de un objeto de notificacion.
 * @param message Un mensaje de notificación de tipo SncackbarMessage que se mostrará en la notificación.
 * @param options Un objeto de opciones de notificación de tipo OptionsObject.
 * @param dismissed Un booleano que indica si la notificación ha sido descartada.
 */
interface Notification {
  message: SnackbarMessage;
  options: OptionsObject;
  dismissed: boolean;
}

declare module "notistack" {
  /**
   * Define variantes personalizadas para las notificaciones. Cuando se define un customNotification se le pasa un message.
   */
  export interface VariantOverrides {
    // define custom variants
    customNotification: {
      message?: string;
    };
  }
}
/**
 * Describe un conjunto de acciones que se pueden realizar con las notificaciones.
 * @function push Esta función que agrega una notificación parcial(Partial<Notification>) y devuelve una clave de notificación(SnackbarKey).
 * @function close Esta función cierra una notificación específica indentificada por su clave. Opcionalmente, puede cerrar todas las notificaciones si dismissAll esta establecido true.
 * @function remove Esta función elimina una notificación especifica identificada por su clave.
 */
type Actions = {
  push: (notification: Partial<Notification>) => SnackbarKey;
  close: (key: SnackbarKey, dismissAll?: boolean) => void;
  remove: (key: SnackbarKey) => void;
};
/**
 * Describe un conjunto de acciones que se pueden realizar con modales.
 * @function close Una función para cerrar un modal.
 * @function open Una función para abrir un modal identificado por su nombre.
 */
type ModalActions = {
  close: () => void;
  open: (modalName: string) => void;
};

export type { Notification, Actions, ModalActions };
