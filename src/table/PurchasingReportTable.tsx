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
import { getPrice } from "src/utils/getPrice";

interface PurchasingReportTableProps {
  count: number;
  items: any[];
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  searchName?: string;
}

export const PurchasingReportTable = (props: PurchasingReportTableProps) => {
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
                <TableCell>Code</TableCell>
                <TableCell>Report Action</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.filter((report: any) =>
                report.name.toLowerCase().includes(searchName.toLowerCase())
              ).length > 0 ? (
                items
                  .filter((report: any) =>
                    report.name.toLowerCase().includes(searchName.toLowerCase())
                  )
                  .map((report: any) => {
                    return (
                      <TableRow hover key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>{report.action}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.category}</TableCell>
                        <TableCell>{report.quantity}</TableCell>
                        <TableCell>{getPrice(report.price)}</TableCell>
                        <TableCell>{getPrice(report.total)}</TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                    There&apos;s no report
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

PurchasingReportTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
