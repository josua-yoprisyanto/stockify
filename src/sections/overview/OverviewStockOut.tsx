import PropTypes from "prop-types";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { Button, Card, CardContent, CardHeader, SvgIcon } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Chart } from "src/components/chart";
import { ApexOptions } from "apexcharts";

const useChartOptions = (theme: any): ApexOptions => {
  return {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "datetime", // Set the type to 'datetime'
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    title: {
      text: "Stock Out Revenue (7 Days)",
      align: "center",
    },
  };
};

interface OverviewStockOutProps {
  chartSeries: any;
  sx?: React.CSSProperties;
}

export const OverviewStockOut = (props: OverviewStockOutProps) => {
  const { chartSeries, sx } = props;
  const theme = useTheme();
  const chartOptions = useChartOptions(theme);

  return (
    <Card sx={sx}>
      <CardHeader title="Stock Out" />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="line" width="100%" />
      </CardContent>
    </Card>
  );
};

OverviewStockOut.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
