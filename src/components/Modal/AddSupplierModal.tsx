import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import TextFieldForm from "../FormField/TextFieldForm";
import { handleAddLog } from "src/utils/addLog";

interface AddSupplierModalProps {
  open: boolean;
  handleClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
  selectedSupplier: any; //
}

const AddSupplierModal = ({
  open,
  handleClose,
  setIsLoading,
  selectedSupplier,
}: AddSupplierModalProps) => {
  const formik = useFormik({
    initialValues: {
      id: selectedSupplier?.id || 0,
      name: selectedSupplier?.name || "",
      email: selectedSupplier?.email || "",
      phone: selectedSupplier?.phone || "",
      address: selectedSupplier?.address || "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string().max(255).required("Email is required"),
      phone: Yup.string().max(255).required("Phone is required"),
      address: Yup.string().max(255).required("Address is required"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);

      const reqBody = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
      };

      if (values.id === 0) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/supplier`, reqBody);

        if (response.status === 201) {
          handleAddLog(`added supplier with name ${values.name}`);

          handleClose();
          setIsLoading(false);
        }
      } else {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/supplier/${values.id}`,
          reqBody
        );

        if (response.status === 200) {
          handleAddLog(`update supplier with name ${values.name}`);

          handleClose();
          setIsLoading(false);
        }
      }
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form noValidate onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            borderRadius: 2,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {formik.values.id === 0 ? "Add" : "Edit"} Supplier
          </Typography>

          <TextFieldForm
            sx={{ mt: 5 }}
            fullWidth
            label="Name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
            error={formik.errors.name}
          />
          <TextFieldForm
            sx={{ mt: 1 }}
            fullWidth
            label="Email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            error={formik.errors.email}
          />
          <TextFieldForm
            sx={{ mt: 1 }}
            fullWidth
            label="Phone Number"
            name="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.phone}
            error={formik.errors.phone}
          />
          <TextFieldForm
            sx={{ mt: 1 }}
            fullWidth
            label="Address"
            name="address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.address}
            error={formik.errors.address}
          />

          <Stack direction="row">
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3, mr: 1 }}
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3, ml: 1 }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};

export default AddSupplierModal;
