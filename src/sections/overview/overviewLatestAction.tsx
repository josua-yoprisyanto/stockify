import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import Link from "next/link";
import moment from "moment";

interface OverviewLatestActionProps {
  logs: any[];
  sx: any;
}

export const OverviewLatestAction = (props: OverviewLatestActionProps) => {
  const { logs = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Action Log" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Container>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action Log</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.length > 0 ? (
                logs.map((log: any, index: number) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>{moment(log.timestamp).format("DD MMMM YYYY HH:mm")}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                    There&apos;s no action log
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Container>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          <Link href={"/log"} style={{ textDecoration: "none", color: "black" }}>
            {" "}
            View all
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestAction.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
