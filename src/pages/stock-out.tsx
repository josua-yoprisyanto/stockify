import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextFieldForm from "src/components/FormField/TextFieldForm";
import { Scrollbar } from "src/components/scrollbar";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useState } from "react";
import AddStockOutProductModal from "src/components/Modal/AddStockOutProductModal";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import axios from "axios";
import moment from "moment";
import { handleAddLog } from "src/utils/addLog";
import EditIcon from "@heroicons/react/20/solid/PencilSquareIcon";
import { getPrice } from "src/utils/getPrice";

const Page = () => {
  const [openAddStockOutProductModal, setOpenAddStockOutProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const formik = useFormik({
    initialValues: {
      destination: "",
      note: "",
    },
    validationSchema: Yup.object({
      destination: Yup.string().required("destination is required"),
      note: Yup.string().required("Note is required"),
    }),
    onSubmit: async (values, helpers) => {
      selectedProducts.map((product: any) => {
        const reqBody = {
          destination: values.destination,
          note: values.note,
          name: product.name,
          price: product.price,
          category: product.category,
          quantity: product.quantity,
          total: product.total,
          created_at: moment().format(),
        };

        const response = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stock-out-report`, reqBody);

        if (response) {
          const updateProductDetail = async () => {
            const productDetail = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`
            );

            if (productDetail) {
              const updateQuantity = {
                name: productDetail.data.name,
                description: productDetail.data.description,
                category: productDetail.data.category,
                price: productDetail.data.price,
                supplier: productDetail.data.supplier,
                quantity: productDetail.data.quantity - Number(product.quantity),
              };

              axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`,
                updateQuantity
              );
            }
          };
          updateProductDetail();
        }

        handleAddLog(`Stock Out to ${values.destination} with product name ${product.name}`);

        formik.resetForm();
        setSelectedProducts([]);
      });
    },
  });

  const handleRemove = (index: number) => {
    let arr = [...selectedProducts];
    arr.splice(index, 1);
    setSelectedProducts(arr);
  };

  const [selectedProduct, setSelectedProduct] = useState();

  const handleEdit = (product: any, index: number) => {
    setSelectedProduct({
      ...product,
      index,
    });
    setOpenAddStockOutProductModal(true);
  };

  return (
    <>
      <Head>
        <title>Stock Out | Stockify</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <form noValidate onSubmit={formik.handleSubmit}>
          <Container>
            <Stack>
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
                }}
              >
                Stock Out
              </Typography>

              <TextFieldForm
                sx={{ mt: 3 }}
                fullWidth
                label="Destination"
                name="destination"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.destination}
                error={formik.errors.destination}
              />
              <TextFieldForm
                sx={{ mt: 3 }}
                fullWidth
                label="Note"
                name="note"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.note}
                error={formik.errors.note}
              />

              <Stack direction="row" justifyContent="space-between" mt={5}>
                <Typography
                  color="neutral.100"
                  variant="subtitle2"
                  sx={{
                    alignItems: "center",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    textAlign: "left",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  Product Out List
                </Typography>

                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setOpenAddStockOutProductModal(true)}
                >
                  Add Product
                </Button>
              </Stack>

              <Card sx={{ mt: 2 }}>
                <Scrollbar>
                  <Box sx={{ width: "100%" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>No</TableCell>
                          <TableCell>Code</TableCell>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Quantity Out</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Total Price</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProducts.length > 0 ? (
                          selectedProducts.map((product: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{product.id}</TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>{getPrice(product.price)}</TableCell>
                              <TableCell>{product.total}</TableCell>
                              <TableCell
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "green",
                                    color: "white",
                                    marginLeft: 10,
                                    marginRight: 10,
                                  }}
                                  onClick={() => {
                                    handleEdit(product, index);
                                  }}
                                >
                                  <SvgIcon fontSize="small">
                                    <EditIcon />
                                  </SvgIcon>
                                </Button>
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: "red", color: "white" }}
                                  onClick={() => handleRemove(index)}
                                >
                                  <SvgIcon fontSize="small">
                                    <TrashIcon />
                                  </SvgIcon>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                              There&apos;s no product selected
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                </Scrollbar>
              </Card>

              <Stack direction="row">
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3, ml: 1 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={selectedProducts.length === 0}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Container>
        </form>
      </Box>

      {openAddStockOutProductModal && (
        <AddStockOutProductModal
          open={openAddStockOutProductModal}
          handleClose={() => setOpenAddStockOutProductModal(false)}
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
