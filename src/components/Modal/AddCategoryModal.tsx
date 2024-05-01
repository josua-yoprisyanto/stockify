import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment";
import TextFieldForm from "../FormField/TextFieldForm";
import { handleAddLog } from "src/utils/addLog";

interface AddCategoryModalProps {
  open: boolean;
  handleClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
  selectedCategory: any; //
}

const AddCategoryModal = ({
  open,
  handleClose,
  setIsLoading,
  selectedCategory,
}: AddCategoryModalProps) => {
  const formik = useFormik({
    initialValues: {
      id: selectedCategory?.id || 0,
      name: selectedCategory?.name || "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);

      const reqBody = {
        name: values.name,
      };

      if (values.id === 0) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, reqBody);

        if (response.status === 201) {
          handleAddLog(`added category with name ${values.name}`);

          handleClose();
          setIsLoading(false);
        }
      } else {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${values.id}`,
          reqBody
        );

        if (response.status === 200) {
          handleAddLog(`updated category with name ${values.name}`);

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
            {formik.values.id === 0 ? "Add" : "Edit"} Category
          </Typography>

          <TextFieldForm
            sx={{ mt: 3 }}
            fullWidth
            label="Name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
            error={formik.errors.name}
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

export default AddCategoryModal;
