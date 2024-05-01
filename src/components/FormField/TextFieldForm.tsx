import { TextField, Typography } from "@mui/material";
import { FormikErrors } from "formik";
import React from "react";

interface TextFieldFormProps {
  label: string;
  name: string;
  onBlur: any;
  onChange: any;
  value: string;
  error: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  [key: string]: any;
}

const TextFieldForm = ({
  label,
  name,
  onBlur,
  onChange,
  value,
  error,
  ...props
}: TextFieldFormProps) => {
  return (
    <>
      <TextField
        label={label}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...props}
      />

      {error && typeof error === "string" && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </>
  );
};

export default TextFieldForm;
