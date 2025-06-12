import {
  defaultValueMap,
  typeValidationMap,
  validationFunctions,
} from "@/functions/validation.controls";

import { IConnectionMode } from "@/types/forms.types";
import { IGenericControls } from "@/types/controls.types";
import { getItems } from "@/functions/service.controls";
import { getRecordForEdit } from "@/functions/service.form";

export const initializeForm = async (
  controls: IGenericControls[],
  endpointPath: string,
  idForEdit: any,
  connectionMode: IConnectionMode,
  getByIdFunction?: Function,
  args?: any
): Promise<{
  initialFormData: any;
  validationSchema: any;
  dataSource: any;
  editMode: boolean;
}> => {
  let initialFormData: any = {};
  const validationSchema: any = {};
  const dataSource: any = {};
  let editMode: boolean = false;
  await Promise.all(
    controls
      .filter(({ name }: any) => name.length)
      .map(
        async ({
          name,
          type,
          defaultValue,
          validations,
          url,
          options,
        }: any) => {
          initialFormData[name] =
            defaultValue ?? defaultValueMap[type as never];
          if (optionsComponents.includes(type) && url) {
            if (options)
              import.meta.env.MODE === "dev" &&
                console.log(
                  Date.now(),
                  `El control ${name} tiene url y opciones, los datos que mostrará vendrán del servicio correspondiente`
                );
            dataSource[name] = await getItems({ name, url });
          }
          validationSchema[name] = typeValidationMap[type as never];
          if (validations) {
            Object.keys(validations).forEach((validatorKey) => {
              const validator = validationFunctions[validatorKey];
              if (validator) {
                validationSchema[name] = validator(
                  validationSchema[name],
                  validations[validatorKey]
                );
              }
            });
          }
        }
      )
  );
  if (idForEdit) {
    const editValues =
      typeof getByIdFunction === "function"
        ? await getByIdFunction(idForEdit)
        : await getRecordForEdit(idForEdit, endpointPath, args);
    import.meta.env.MODE === "dev" && console.log("editValues", editValues);
    initialFormData = editValues;
    editMode = editValues.editMode !== undefined ? editValues.editMode : true;
  }

  return {
    initialFormData,
    validationSchema,
    dataSource,
    editMode,
  };
};
const optionsComponents = ["select", "multiselect", "autocomplete", "radio"];
const noValidateComponent = ["scanner"];
