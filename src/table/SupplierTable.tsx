import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import EditIcon from "@heroicons/react/20/solid/PencilSquareIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import axios from "axios";

interface SupplierTableProps {
  count: number;
  items: any[];
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  setIsLoading?: (isLoading: boolean) => void;
  setSelectedSupplier?: (supplier: any) => void;
  setOpenAddSupplierModal?: (isOpen: boolean) => void;
  searchName?: string;
}

export const SupplierTable = (props: SupplierTableProps) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setIsLoading,
    setSelectedSupplier,
    setOpenAddSupplierModal,
    searchName,
  } = props;

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/supplier/${id}`);

    if (data.success) {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/supplier/${id}`);

    if (response.data) {
      setSelectedSupplier(response.data);
      setOpenAddSupplierModal(true);
    }
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell style={{ textAlign: "center" }} colSpan={2}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.filter((supplier: any) =>
                supplier.name.toLowerCase().includes(searchName.toLowerCase())
              ).length > 0 ? (
                items
                  .filter((supplier: any) =>
                    supplier.name.toLowerCase().includes(searchName.toLowerCase())
                  )
                  .map((supplier: any) => {
                    return (
                      <TableRow hover key={supplier.id}>
                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Typography variant="subtitle2">{supplier.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell style={{ wordWrap: "break-word" }}>{supplier.address}</TableCell>
                        <TableCell
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            startIcon={
                              <SvgIcon fontSize="small">
                                <EditIcon />
                              </SvgIcon>
                            }
                            variant="contained"
                            style={{ backgroundColor: "green", color: "white" }}
                            onClick={() => handleEdit(supplier.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            startIcon={
                              <SvgIcon fontSize="small">
                                <TrashIcon />
                              </SvgIcon>
                            }
                            variant="contained"
                            style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}
                            onClick={() => handleDelete(supplier.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                    There&apos;s no supplier
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

SupplierTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  setIsLoading: PropTypes.func,
  setSelectedSupplier: PropTypes.func,
  setOpenAddSupplierModal: PropTypes.func,
  searchName: PropTypes.string,
};
