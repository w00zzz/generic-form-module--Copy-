import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import useFormDataSource from "@/hooks/use-form-data-source";
import { useFormikContext } from "formik";

export const BasicMultiSelectFields = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  disabled,
  hidden,
  sx,
  options,
  placeholder,
  multiple,
  group,
  validations,
  onChange,
  checkValues,
  disabledOnEdit,
  editMode,
  useRef,
}: any) => {
  const [dataSource] = useFormDataSource();
  const [items, setItems] = useState(options ?? dataSource?.[name]);
  const ref = useFormikContext();
  const { setFieldValue, setFieldTouched, values, touched, errors } = ref;
  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  useEffect(() => {
    setFieldValue(name, Array.isArray(initialValue) ? initialValue : [], false);
  }, [initialValue]);

  useEffect(() => {
    if (hidden?.(values)) {
      setFieldValue(name, initialValue ? initialValue : [], true);
    }
  }, [values]);

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onChange?.(event, ref);
    setFieldValue(
      name,
      typeof value === "string" ? value.split(",") : value,
      true
    );
    setFieldTouched(name);
  }, []);

  return (
    <Grid
      item
      display={hidden?.(values) ? "none" : "unset"}
      xs={gridValues?.xs}
      sm={gridValues?.sm}
      md={gridValues?.md}
      lg={gridValues?.lg}
      xl={gridValues?.xl}
      sx={gridSx}
    >
      <FormControl
        fullWidth
        error={error}
        disabled={(editMode && disabledOnEdit) || disabled?.(values)}
      >
        <InputLabel id={`${id ?? name}-label`}>
          <label>
            {label}
            {(validations?.length || validations?.min) && (
              <b style={{ color: "red" }}> * </b>
            )}
          </label>
        </InputLabel>
        <Select
          id={id ?? name}
          name={name}
          label={
            <label>
              {label}
              {(validations?.length || validations?.min) && (
                <b style={{ color: "red" }}> * </b>
              )}
            </label>
          }
          value={Array.isArray(value) ? value : []}
          onChange={handleChange}
          sx={sx}
          multiple={true}
          disabled={disabled?.(values)}
          hidden={hidden?.(values)}
          renderValue={(selected: any) =>
            multiple == "chips" ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {items
                  ?.filter(
                    ({ idconcepto }: any) =>
                      selected?.includes(`${idconcepto}` as never)
                  )
                  .map((item: any) => (
                    <Chip
                      key={`${item.idconcepto}`}
                      label={item.denominacion}
                    />
                  ))}
              </Box>
            ) : (
              items
                ?.filter(({ idconcepto }: any) =>
                  selected.includes(`${idconcepto}` as never)
                )
                .map(({ denominacion }: any) => denominacion)
                .join(", ")
            )
          }
          ref={useRef}
        >
          {items?.map((option: any) => {
            return (
              <MenuItem
                value={`${option.idconcepto}`}
                key={`${option.idconcepto}`}
              >
                {multiple == "check" && (
                  <Checkbox checked={value.includes(`${option.idconcepto}`)} />
                )}
                {/* <InputLabel>{option.denominacion}</InputLabel> */}
                <InputLabel>
                  {checkValues?.includes(option.idconcepto) && (
                    <CheckIcon color="primary" sx={{ marginRight: "2px" }} />
                  )}
                  {option.denominacion}
                </InputLabel>
              </MenuItem>
            );
          })}
        </Select>

        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </Grid>
  );
};
