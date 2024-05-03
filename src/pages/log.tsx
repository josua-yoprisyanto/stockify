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
import { LogTable } from "src/table/LogTable";

const useLogs = (log: any, page: any, rowsPerPage: any) => {
  return useMemo(() => {
    return applyPagination(log, page, rowsPerPage);
  }, [page, rowsPerPage, log]);
};

const Page = () => {
  const [logData, setLogData] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [exportData, setExportData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const logs = useLogs(logData, page, rowsPerPage);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    const handleFetchActionLog = async () => {
      setIsLoading(true);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/log`);

      if (response.status === 200) {
        const exportTitle = [["Action", "timestamp"]];

        response.data.length > 0
          ? response.data.map((log: any) => {
              exportTitle.push([log.message, moment(log.timestamp).format("DD/MM/YYYY HH:mm")]);
            })
          : exportTitle.push([]);

        setExportData(exportTitle);

        setLogData(response.data.reverse());
        setIsLoading(false);
        setScreenLoading(false);
      }
    };

    if (isLoading) {
      handleFetchActionLog();
    }
  }, [searchName, isLoading]);

  if (isLoading && screenLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Head>
        <title>Action Log | Stockify</title>
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
                <Typography variant="h4">Action Log</Typography>
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
            </Stack>
            <SearchBar placeholder="Search Log" onChange={setSearchName} value={searchName} />
            <LogTable
              count={logData.length}
              items={logs}
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
