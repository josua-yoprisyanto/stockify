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
import moment from "moment";
import { PurchasingReportTable } from "src/table/PurchasingReportTable";
import { handleAddLog } from "src/utils/addLog";

const useReports = (report: any, page: any, rowsPerPage: any) => {
  return useMemo(() => {
    return applyPagination(report, page, rowsPerPage);
  }, [page, rowsPerPage, report]);
};

const Page = () => {
  const [reportData, setReportData] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [exportData, setExportData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const reports = useReports(reportData, page, rowsPerPage);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    const handleFetchReport = async () => {
      setIsLoading(true);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/purchase-report`);

      if (response.status === 200) {
        const exportTitle = [
          ["Purchasing Report"],
          [],
          ["Code", "Action", "Name", "Category", "Quantity", "Price", "Total Price"],
        ];

        response.data.length > 0
          ? response.data.map((report: any) => {
              exportTitle.push([
                report.id,
                report.action,
                report.name,
                report.category,
                report.quantity,
                report.price,
                report.total,
              ]);
            })
          : exportTitle.push([]);

        setExportData(exportTitle);

        setReportData(response.data);
        setIsLoading(false);
        setScreenLoading(false);
      }
    };

    if (isLoading) {
      handleFetchReport();
    }
  }, [searchName, isLoading]);

  if (isLoading && screenLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Head>
        <title>Purchasing Report | Stockify</title>
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
                <Typography variant="h4">Purchasing Report</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                    onClick={() => {
                      handleAddLog("exported purchasing report");
                    }}
                  >
                    <CSVLink style={{ textDecoration: "none" }} data={exportData}>
                      Export
                    </CSVLink>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <SearchBar placeholder="Search Product" onChange={setSearchName} value={searchName} />
            <PurchasingReportTable
              count={reportData.length}
              items={reports}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              searchName={searchName}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
