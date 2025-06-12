import { Actions, Notification } from "../types/types";
import { atom, useRecoilState } from "recoil";
import { useCallback, useMemo } from "react";

import type { SnackbarKey } from "notistack";

const notificationsState = atom<Notification[]>({
  key: "notificationsState",
  default: [],
});

function useNotifications(
  notificationsDefaults?: any
): [Notification[], Actions] {
  const [notifications, setNotifications] = useRecoilState(notificationsState);

  const push = useCallback(
    (notification: Partial<Notification>) => {
      // TODO (Suren): use uuid

      setNotifications((notifications): Notification[] => [
        // TODO (Suren): use immer
        ...notifications,
        {
          ...notification,
          message: notification.message,
          dismissed: false,
          options: {
            ...notificationsDefaults?.options,
            ...notification.options,
          },
        },
      ]);

      return notification?.options?.key ?? "";
    },
    [setNotifications]
  );

  const close = useCallback(
    (key: SnackbarKey, dismissAll = !key) => {
      setNotifications((notifications) =>
        notifications.map((notification) =>
          dismissAll || notification.options.key === key
            ? { ...notification, dismissed: true }
            : { ...notification }
        )
      );
    },
    [setNotifications]
  );

  const remove = useCallback(
    (key: SnackbarKey) => {
      setNotifications((notifications) =>
        notifications.filter((notification) => notification.options.key !== key)
      );
    },
    [setNotifications]
  );

  const actions = useMemo<Actions>(
    () => ({ push, close, remove }),
    [push, close, remove]
  );

  return [notifications, actions];
}

export default useNotifications;
