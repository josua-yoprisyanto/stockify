import { useCallback, useEffect, useMemo, useState } from "react";
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
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import axios from "axios";
import { CSVLink } from "react-csv";
import AddCategoryModal from "src/components/Modal/AddCategoryModal";
import { CategoryTable } from "../table/CategoryTable";
import { handleAddLog } from "src/utils/addLog";

const useCategories = (category: any, page: any, rowsPerPage: any) => {
  return useMemo(() => {
    return applyPagination(category, page, rowsPerPage);
  }, [page, rowsPerPage, category]);
};

const Page = () => {
  const [categoryData, setCategoryData] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [exportData, setExportData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const categories = useCategories(categoryData, page, rowsPerPage);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const handleFetchCategory = async () => {
      setIsLoading(true);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

      if (response.status === 200) {
        const exportTitle = [["Categories"], [], ["No", "Name"]];

        response.data.length > 0
          ? response.data.map((category: any, index: number) => {
              exportTitle.push([index + 1, category.name]);
            })
          : exportTitle.push([]);

        setExportData(exportTitle);

        setCategoryData(response.data);
        setIsLoading(false);
        setScreenLoading(false);
      }
    };

    if (isLoading) {
      handleFetchCategory();
    }
  }, [searchName, isLoading]);

  if (isLoading && screenLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Head>
        <title>Category | Stockify</title>
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
                <Typography variant="h4">Categories</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                    onClick={() => {
                      handleAddLog("exported category");
                    }}
                  >
                    <CSVLink style={{ textDecoration: "none" }} data={exportData}>
                      Export
                    </CSVLink>
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={() => {
                    setOpenAddCategoryModal(true);
                    console.log("hi");
                  }}
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
            <SearchBar
              placeholder="Search Categories"
              onChange={setSearchName}
              value={searchName}
            />
            <CategoryTable
              count={categoryData.length}
              items={categories}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              setIsLoading={setIsLoading}
              setSelectedCategory={setSelectedCategory}
              setOpenAddCategoryModal={setOpenAddCategoryModal}
              searchName={searchName}
            />
          </Stack>
        </Container>
      </Box>

      {openAddCategoryModal && (
        <AddCategoryModal
          open={openAddCategoryModal}
          handleClose={() => {
            setOpenAddCategoryModal(false);
            setSelectedCategory(undefined);
          }}
          setIsLoading={setIsLoading}
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
