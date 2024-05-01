import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import EditIcon from "@heroicons/react/20/solid/PencilSquareIcon";
import EyeIcon from "@heroicons/react/20/solid/EyeIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import axios from "axios";
import { getCapitalize } from "src/utils/getCapitilize";
import { getPrice } from "src/utils/getPrice";

interface ProductTableProps {
  count: number;
  items: any[];
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  setIsLoading?: (isLoading: boolean) => void;
  setSelectedProduct?: (product: any) => void;
  setOpenAddProductModal?: (isOpen: boolean) => void;
  searchName?: string;
  setOpenProductDetailModal?: (isOpen: boolean) => void;
}

export const ProductTable = (props: ProductTableProps) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setIsLoading,
    setSelectedProduct,
    setOpenAddProductModal,
    searchName,
    setOpenProductDetailModal,
  } = props;

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

    if (data) {
      setIsLoading(false);
    }
  };

  const handelGetDetail = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

    if (response.data) {
      setSelectedProduct(response.data);
      setOpenProductDetailModal(true);
    }
  };

  const handleEdit = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

    if (response.data) {
      setSelectedProduct(response.data);
      setOpenAddProductModal(true);
    }
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Description</TableCell>
                <TableCell>Product Category</TableCell>
                <TableCell>Product Quantity</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell style={{ display: "flex", justifyContent: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.filter((product: any) =>
                product.name.toLowerCase().includes(searchName.toLowerCase())
              ).length > 0 ? (
                items
                  .filter((product: any) =>
                    product.name.toLowerCase().includes(searchName.toLowerCase())
                  )
                  .map((product: any) => {
                    return (
                      <TableRow hover key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{getCapitalize(product.name)}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.quantity}</TableCell>

                        <TableCell>{getPrice(product.price)}</TableCell>

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
                                <EyeIcon />
                              </SvgIcon>
                            }
                            variant="contained"
                            style={{ backgroundColor: "blue", color: "white" }}
                            onClick={() => {
                              handelGetDetail(product.id);
                            }}
                          >
                            Detail
                          </Button>
                          <Button
                            startIcon={
                              <SvgIcon fontSize="small">
                                <EditIcon />
                              </SvgIcon>
                            }
                            variant="contained"
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                            onClick={() => {
                              handleEdit(product.id);
                            }}
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
                            style={{ backgroundColor: "red", color: "white" }}
                            onClick={() => handleDelete(product.id)}
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
                    There&apos;s no product
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

ProductTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  setIsLoading: PropTypes.func,
  setSelectedProduct: PropTypes.func,
  setOpenAddProductModal: PropTypes.func,
  searchName: PropTypes.string,
  setOpenProductDetailModal: PropTypes.func,
};
