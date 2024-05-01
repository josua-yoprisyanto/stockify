import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  LinearProgressProps,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { getPrice } from "src/utils/getPrice";

const theme = createTheme({
  palette: {
    primary: { main: "#0000FF" }, // Blue
    secondary: { main: "#FFA500" }, // Yellow
    error: { main: "#FF0000" }, // Red
    success: { main: "#008000" }, // Green
  },
});

interface OverviewBudgetProps {
  sx?: object;
  value: number;
  title: string;
  icon?: React.ReactNode;
  iconColor?: string;
  lineColor?: string;
  isPrice?: boolean;
}

export const OverviewBudget = (props: OverviewBudgetProps) => {
  const { sx, value, title, icon, iconColor, lineColor, isPrice } = props;

  const [progressColor, setProgressColor] = useState("primary"); // Default color is 'primary'

  const colorMap = {
    blue: "primary",
    orange: "secondary",
    red: "error",
    green: "success",
  };

  useEffect(() => {
    if (lineColor === "red") {
      setProgressColor(colorMap.red);
    } else if (lineColor === "green") {
      setProgressColor(colorMap.green);
    } else if (lineColor === "orange") {
      setProgressColor(colorMap.orange);
    } else {
      setProgressColor(colorMap.blue);
    }
  }, [colorMap.blue, colorMap.green, colorMap.orange, colorMap.red, lineColor]);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            <Typography variant="h6">{isPrice ? getPrice(value) : value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: iconColor,
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>{icon}</SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <ThemeProvider theme={theme}>
            <LinearProgress
              value={100}
              variant="determinate"
              color={progressColor as LinearProgressProps["color"]}
            />
          </ThemeProvider>
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
