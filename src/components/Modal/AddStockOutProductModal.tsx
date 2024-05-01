import { Box, Button, Divider, MenuItem, Modal, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import TextFieldForm from "../FormField/TextFieldForm";
import FormSelectField from "../FormField/FormSelectField";
import { getCapitalize } from "src/utils/getCapitilize";
import { getPrice } from "src/utils/getPrice";

interface AddStockOutProductModalProps {
  open: boolean;
  handleClose: () => void;
  setSelectedProducts: any;
  selectedProducts: any[];
  selectedProduct: any;
}

const AddStockOutProductModal = ({
  open,
  handleClose,
  setSelectedProducts,
  selectedProducts,
  selectedProduct,
}: AddStockOutProductModalProps) => {
  const [productList, setProductList] = useState([]);
  const [productDetail, setProductDetail] = useState({
    id: selectedProduct?.id || 0,
    name: selectedProduct?.name || "",
    description: selectedProduct?.description || "",
    quantity: selectedProduct?.quantity || 0,
    category: selectedProduct?.category || "",
    price: selectedProduct?.price || 0,
    supplier: selectedProduct?.supplier || "",
  });

  const formik = useFormik({
    initialValues: {
      productId: selectedProduct?.id || "",
      quantity: selectedProduct?.quantity || 0,
    },
    validationSchema: Yup.object({
      productId: Yup.string(),
      quantity: Yup.number().min(0).max(productDetail.quantity).required("Quantity is required"),
    }),
    onSubmit: async (values, helpers) => {
      const product = {
        id: values.productId,
        name: productDetail.name,
        price: productDetail.price,
        quantity: values.quantity,
        category: productDetail.category,
        total: Number(values.quantity) * productDetail.price,
      };

      let arr = [...selectedProducts];

      if (selectedProduct) {
        arr[selectedProduct.index] = product;
      } else {
        arr.push(product);
      }

      setSelectedProducts(arr);

      handleClose();
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

      setProductList(response.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${formik.values.productId}`
      );

      setProductDetail(response.data);
    };

    if (formik.values.productId.length > 0) {
      fetchProductDetail();
    }
  }, [formik.values.productId]);

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
            width: 700,
            borderRadius: 2,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Stock Out Product
          </Typography>

          {formik.values.productId !== "" ? (
            <Box sx={{ width: "100%" }}>
              <Typography
                color="neutral.100"
                variant="subtitle2"
                sx={{
                  alignItems: "center",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  width: "100%",
                  color: "black",
                  fontWeight: "600",
                  mt: 3,
                }}
              >
                Product Detail
              </Typography>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                  pt: 1,
                }}
              >
                <Typography sx={{ width: "25%" }}>Name</Typography>
                <Typography>{productDetail.name}</Typography>
              </Stack>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                  pt: 1,
                }}
              >
                <Typography sx={{ width: "25%" }}>Description</Typography>
                <Typography>{productDetail.description}</Typography>
              </Stack>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                  pt: 1,
                }}
              >
                <Typography sx={{ width: "25%" }}>Category</Typography>
                <Typography>{productDetail.category}</Typography>
              </Stack>

              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                  pt: 1,
                }}
              >
                <Typography sx={{ width: "25%" }}>Price</Typography>
                <Typography>{getPrice(productDetail.price)}</Typography>
              </Stack>

              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                  pt: 1,
                }}
              >
                <Typography sx={{ width: "25%" }}>Quantity</Typography>
                <Typography sx={{ alignItems: "center" }}>{productDetail.quantity}</Typography>
              </Stack>

              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                  pt: 1,
                }}
              >
                <Typography sx={{ width: "25%" }}>Supplier</Typography>
                <Typography>{productDetail.supplier}</Typography>
              </Stack>
            </Box>
          ) : (
            <Box />
          )}

          <FormSelectField
            variant="filled"
            sx={{ mt: 3 }}
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.productId}
            name="productId"
            label="Selected Product"
            error={formik.errors.productId}
          >
            {productList
              .filter(
                (product: any, index: number) =>
                  !selectedProducts
                    .slice(0, index)
                    .some((prevProduct: any) => prevProduct.id === product.id)
              )
              .map((product: any, index: number) => (
                <MenuItem key={index} value={product.id}>
                  {getCapitalize(product.name)}
                </MenuItem>
              ))}
          </FormSelectField>

          <TextFieldForm
            sx={{ mt: 2 }}
            fullWidth
            label="Quantity Out"
            name="quantity"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="string"
            value={formik.values.quantity.toString()}
            error={formik.errors.quantity}
            disabled={formik.values.productId === ""}
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

export default AddStockOutProductModal;
