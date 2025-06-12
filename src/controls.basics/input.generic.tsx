import { Grid, TextField } from "@mui/material";
import { useCallback, useEffect } from "react";

import { useFormikContext } from "formik";

export const BasicTextFields = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  color,
  disabled,
  hidden,
  focused,
  placeholder,
  pattern,
  sx,
  onChange,
  validations,
  multiline,
  disabledOnEdit,
  editMode,
}: any) => {
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  const handleChange = useCallback((e: any) => {
    onChange?.(e);
    setFieldValue(name, e.target.value, true);
    setFieldTouched(name);
  }, []);

  useEffect(() => {
    setFieldValue(name, initialValue ?? "", false);
  }, [initialValue]);

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
      <TextField
        fullWidth
        id={id ?? name}
        name={name}
        multiline={!!multiline}
        minRows={multiline?.minRows}
        maxRows={multiline?.maxRows}
        label={
          <label>
            {label}
            {validations?.required && <b style={{ color: "red" }}> * </b>}
          </label>
        }
        color={color}
        focused={focused}
        placeholder={placeholder}
        disabled={(editMode && disabledOnEdit) || disabled?.(values)}
        sx={sx}
        value={value ?? ""}
        error={error}
        helperText={error}
        onKeyDown={(event: any) => {
          if (pattern && !pattern.test(event.key) && event.keyCode != 8) {
            event.preventDefault();
          }
        }}
        onChange={handleChange}
      />
    </Grid>
  );
};
