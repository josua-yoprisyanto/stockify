import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import moment from "moment";

interface LogTableProps {
  count: number;
  items: any[];
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  searchName?: string;
}

export const LogTable = (props: LogTableProps) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    searchName,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.filter((log: any) =>
                log.message.toLowerCase().includes(searchName.toLowerCase())
              ).length > 0 ? (
                items
                  .filter((log: any) =>
                    log.message.toLowerCase().includes(searchName.toLowerCase())
                  )
                  .map((log: any, index: number) => {
                    return (
                      <TableRow hover key={log.id}>
                        <TableCell>{index + 1}</TableCell>
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
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LogTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  searchName: PropTypes.string,
};
