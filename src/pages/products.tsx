import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import axios from "axios";
import { CSVLink } from "react-csv";
import { ProductTable } from "src/table/ProductTable";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddProductModal from "src/components/Modal/AddProductModal";
import ProductDetailModal from "src/components/Modal/ProductDetailModal";
import { handleAddLog } from "src/utils/addLog";

const useProducts = (product: any, page: any, rowsPerPage: any) => {
  return useMemo(() => {
    return applyPagination(product, page, rowsPerPage);
  }, [page, rowsPerPage, product]);
};

const Page = () => {
  const [productData, setProductData] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [exportData, setExportData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const products = useProducts(productData, page, rowsPerPage);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    const handleFetchProducts = async () => {
      setIsLoading(true);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

      if (response?.status === 200) {
        const exportTitle = [
          ["Products"],
          [],
          [
            "No",
            "Product Name",
            "Product Code",
            "Product Category",
            "Quantity",
            "Price",
            "Supplier Detail",
          ],
        ];

        response.data.length > 0
          ? response.data.map((s, i) => {
              exportTitle.push([
                i + 1,
                s.name,
                s.description,
                s.category,
                s.quantity,
                s.price,
                s.supplier_detail,
              ]);
            })
          : exportTitle.push([]);

        setExportData(exportTitle);
        setProductData(response.data);
        setIsLoading(false);
        setScreenLoading(false);
      }
    };
    if (isLoading) {
      handleFetchProducts();
    }
  }, [searchName, isLoading]);

  if (isLoading && screenLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Head>
        <title>Products | Stockify</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Products</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                    onClick={() => handleAddLog("exported Product")}
                  >
                    <CSVLink style={{ textDecoration: "none" }} data={exportData}>
                      Export
                    </CSVLink>
                  </Button>
                </Stack>
              </Stack>
              <Stack>
                <Button
                  onClick={() => setOpenAddProductModal(true)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <SearchBar placeholder="Search Products" onChange={setSearchName} value={searchName} />
            <ProductTable
              count={productData.length}
              items={products}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              setIsLoading={setIsLoading}
              setSelectedProduct={setSelectedProduct}
              setOpenAddProductModal={setOpenAddProductModal}
              searchName={searchName}
              setOpenProductDetailModal={setOpenProductDetailModal}
            />
          </Stack>
        </Container>
      </Box>

      {openAddProductModal && (
        <AddProductModal
          open={openAddProductModal}
          handleClose={() => {
            setOpenAddProductModal(false);
            setSelectedProduct(undefined);
          }}
          setIsLoading={setIsLoading}
          selectedProduct={selectedProduct}
        />
      )}

      {openProductDetailModal && (
        <ProductDetailModal
          open={openProductDetailModal}
          handleClose={() => {
            setOpenProductDetailModal(false);
            setSelectedProduct(undefined);
          }}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
