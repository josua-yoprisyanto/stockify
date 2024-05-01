import { FormControl, InputLabel, Select, Typography } from "@mui/material";
import { FormikErrors } from "formik";
import React from "react";

interface TextFieldFormProps {
  label: string;
  name: string;
  onBlur: any;
  onChange: any;
  value: string;
  children: any;
  error: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  [key: string]: any;
}

const FormSelectField = ({
  label,
  name,
  onBlur,
  onChange,
  value,
  error,
  children,
  ...props
}: TextFieldFormProps) => {
  return (
    <>
      <FormControl {...props}>
        <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          name={name}
        >
          {children}
        </Select>
      </FormControl>

      {error && typeof error === "string" && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </>
  );
};

export default FormSelectField;
