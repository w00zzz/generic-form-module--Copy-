import { IConnectionMode } from "../types/forms.types";
import axios from "axios";

export const getItems = async ({
  name,
  url,
  connectionMode,
}: {
  name: string;
  url?: string;
  connectionMode?: IConnectionMode;
}): Promise<any> => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.ENV_SERVER_URL}/gw/${url}`
    );
    return Array.isArray(data)
      ? data
      : JSON.parse(localStorage.getItem(url ?? name) ?? "{}") ?? [];
  } catch (error: any) {
    //const fallback = JSON.parse(localStorage.getItem(url ?? name) ?? "{}");
  }
};
