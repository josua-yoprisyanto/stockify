import Head from "next/head";
import {
  Box,
  Card,
  CardContent,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/OverviewBudget";
import { OverviewLatestAction } from "src/sections/overview/overviewLatestAction";
import { OverviewStockOut } from "src/sections/overview/OverviewStockOut";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import BanknotesIcon from "@heroicons/react/24/solid/BanknotesIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { getChartReport } from "src/utils/getChartReport";

const Page = () => {
  const [logData, setLogData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const handleFetchActionLog = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/log`);

      if (response.status === 200) {
        setLogData(response.data.reverse().slice(0, 10));
      }
    };

    const handleFetchProducts = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

      if (response.status === 200) {
        setProductsData(response.data);
      }
    };

    const handleFetchStockOutReport = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stock-out-report`);

      if (response.status === 200) {
        setReportData(response.data);
      }
    };

    handleFetchStockOutReport();
    handleFetchProducts();
    handleFetchActionLog();
  }, []);

  const stockOutRevenue = reportData.reduce((acc, report) => acc + report.total, 0) || 0;
  const totalStockOut = reportData.reduce((acc, report) => acc + Number(report.quantity), 0) || 0;
  const totalProductRevenue =
    productsData.reduce((acc, product) => acc + Number(product.quantity) * product.price, 0) || 0;

  const chartData = getChartReport(reportData);

  const top5LowestQuantity = productsData
    .slice()
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 3);

  return (
    <>
      <Head>
        <title>Overview | Stockify</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewBudget
                title="Total Product Type"
                value={productsData.length}
                iconColor="orange"
                icon={<ShoppingCartIcon />}
                lineColor={"orange"}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewBudget
                title="All Product Revenue"
                value={totalProductRevenue}
                iconColor="red"
                isPrice
                icon={<BanknotesIcon />}
                lineColor={"red"}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewBudget
                title="Total Stock Out"
                value={totalStockOut}
                iconColor="blue"
                icon={<ChartBarIcon />}
                lineColor={"blue"}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewBudget
                title="Stock Out Revenue"
                iconColor="green"
                value={stockOutRevenue}
                isPrice
                icon={<CurrencyDollarIcon />}
                lineColor={"green"}
              />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewStockOut
                chartSeries={[
                  {
                    name: "Stock Out Revenue",
                    data: chartData.map((entry) => ({ x: new Date(entry.date), y: entry.total })),
                    color: "#0000FF",
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Product Quantity Alert:
              </Typography>
              {top5LowestQuantity.map((product: any) => (
                <Card key={product.id}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Product Name: {product.name}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }} variant="body2">
                      Quantity: {product.quantity} Left
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Category: {product.category}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <OverviewLatestAction logs={logData} sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
