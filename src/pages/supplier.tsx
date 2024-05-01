import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import { SupplierTable } from "src/table/SupplierTable";
import AddSupplierModal from "src/components/Modal/AddSupplierModal";
import { getToken } from "src/utils/getToken";
import axios from "axios";
import { CSVLink } from "react-csv";

const useSuppliers = (data: any, page: any, rowsPerPage: any) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useSupplierIds = (suppliers: any) => {
  return useMemo(() => {
    return suppliers.map((customer: any) => customer.id);
  }, [suppliers]);
};

const Page = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(0);

  const [searchName, setSearchName] = useState("");
  const [exportData, setExportData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const suppliers = useSuppliers(supplierData, page, rowsPerPage);
  const suppliersIds = useSupplierIds(suppliers);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [openAddSupplierModal, setOpenAddSupplierModal] = useState(false);

  const token = getToken();

  useEffect(() => {
    const handleFetchSupplier = async () => {
      setIsLoading(true);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/supplier`);

      if (response.status === 200) {
        const exportTitle = [["Supplier Name", "Email", "Phone", "Address"]];

        response.data.length > 0
          ? response.data.map((supplier: any) => {
              exportTitle.push([supplier.name, supplier.email, supplier.phone, supplier.address]);
            })
          : exportTitle.push([]);

        setExportData(exportTitle);

        setSupplierData(response.data);
        setIsLoading(false);
        setScreenLoading(false);
      }
    };
    if (isLoading) {
      handleFetchSupplier();
    }
  }, [token, isLoading, searchName]);

  if (isLoading && screenLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Head>
        <title>Supplier | Stockify</title>
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
                <Typography variant="h4">Suppliers</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    <CSVLink style={{ textDecoration: "none" }} data={exportData}>
                      Export
                    </CSVLink>
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={() => setOpenAddSupplierModal(true)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <SearchBar placeholder="Search Supplier" onChange={setSearchName} value={searchName} />
            <SupplierTable
              count={supplierData.length}
              items={suppliers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              setIsLoading={setIsLoading}
              setOpenAddSupplierModal={setOpenAddSupplierModal}
              setSelectedSupplier={setSelectedSupplier}
              searchName={searchName}
            />
          </Stack>
        </Container>
      </Box>

      {openAddSupplierModal && (
        <AddSupplierModal
          open={openAddSupplierModal}
          handleClose={() => {
            setOpenAddSupplierModal(false);
            setSelectedSupplier(0);
          }}
          setIsLoading={setIsLoading}
          selectedSupplier={selectedSupplier}
        />
      )}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
