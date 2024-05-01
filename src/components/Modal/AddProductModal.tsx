import { Box, Button, MenuItem, Modal, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import TextFieldForm from "../FormField/TextFieldForm";
import FormSelectField from "../FormField/FormSelectField";
import { handleAddLog } from "src/utils/addLog";

interface AddCategoryModalProps {
  open: boolean;
  handleClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
  selectedProduct: any; //
}

const AddProductModal = ({
  open,
  handleClose,
  setIsLoading,
  selectedProduct,
}: AddCategoryModalProps) => {
  const [categoryList, setCategoryList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

      setCategoryList(response.data);
    };

    const fetchSuppliers = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/supplier`);

      setSupplierList(response.data);
    };

    fetchSuppliers();
    fetchCategories();
  }, []);

  const handlePurchasingReport = async (report: any) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/purchase-report`, report);
  };

  const formik = useFormik({
    initialValues: {
      id: selectedProduct?.id || 0,
      name: selectedProduct?.name || "",
      description: selectedProduct?.description || "",
      category: selectedProduct?.category || "",
      quantity: selectedProduct?.quantity || "",
      price: selectedProduct?.price || "",
      supplier: selectedProduct?.supplier || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required"),
      quantity: Yup.string().required("Quantity is required"),
      price: Yup.number().required("Price is required"),
      supplier: Yup.string().required("Supplier is required"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);

      const reqBody = {
        name: values.name,
        description: values.description,
        category: values.category,
        quantity: values.quantity,
        price: values.price,
        supplier: values.supplier,
      };

      if (values.id === 0) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, reqBody);

        if (response.status === 201) {
          handleAddLog(`added product with name ${values.name}`);

          const report = {
            action: "purchasing",
            name: values.name,
            quantity: values.quantity,
            category: values.category,
            price: values.price,
            total: values.price * values.quantity,
          };

          handlePurchasingReport(report);

          handleClose();
          setIsLoading(false);
        }
      } else {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${values.id}`,
          reqBody
        );

        if (response.status === 200) {
          handleAddLog(`update product with name ${values.name}`);

          const report = {
            action: "modified",
            name: values.name,
            quantity: values.quantity,
            category: values.category,
            price: values.price,
            total: values.price * values.quantity,
          };

          handlePurchasingReport(report);

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
            {formik.values.id === 0 ? "Add" : "Edit"} Product
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

          <TextFieldForm
            sx={{ mt: 2 }}
            fullWidth
            label="Description"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.description}
            error={formik.errors.description}
          />

          <FormSelectField
            variant="filled"
            sx={{ mt: 2 }}
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.category}
            name="category"
            label="Category"
            error={formik.errors.category}
          >
            {categoryList.map((category: any, index: number) => (
              <MenuItem key={index} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </FormSelectField>

          <TextFieldForm
            sx={{ mt: 2 }}
            fullWidth
            label="Quantity"
            name="quantity"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.quantity}
            error={formik.errors.quantity}
          />

          <TextFieldForm
            sx={{ mt: 2 }}
            fullWidth
            label="Price"
            name="price"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.price}
            error={formik.errors.price}
          />

          <FormSelectField
            variant="filled"
            sx={{ mt: 2 }}
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.supplier}
            name="supplier"
            label="Supplier"
            error={formik.errors.supplier}
          >
            {supplierList.map((supplier: any, index: number) => (
              <MenuItem key={index} value={`${supplier.name} - Contact: ${supplier.email}`}>
                {supplier.name} - Contact: {supplier.email}
              </MenuItem>
            ))}
          </FormSelectField>

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

export default AddProductModal;
