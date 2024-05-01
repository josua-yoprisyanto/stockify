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
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import axios from "axios";
import { handleAddLog } from "src/utils/addLog";
import { getCapitalize } from "src/utils/getCapitilize";

interface CategoryTableProps {
  count: number;
  items: any[];
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  setIsLoading?: (isLoading: boolean) => void;
  setSelectedCategory?: (category: any) => void;
  setOpenAddCategoryModal?: (isOpen: boolean) => void;
  searchName?: string;
}

export const CategoryTable = (props: CategoryTableProps) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setIsLoading,
    setSelectedCategory,
    setOpenAddCategoryModal,
    searchName,
  } = props;

  const handleDelete = async (id: any) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);

    if (data) {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id: any) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);

    if (response.data) {
      setSelectedCategory(response.data);
      setOpenAddCategoryModal(true);
    }
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell colSpan={2} style={{ display: "flex", justifyContent: "center" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.filter((category: any) =>
                category.name.toLowerCase().includes(searchName.toLowerCase())
              ).length > 0 ? (
                items
                  .filter((category: any) =>
                    category.name.toLowerCase().includes(searchName.toLowerCase())
                  )
                  .map((category: any, index: number) => {
                    return (
                      <TableRow hover key={category.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{getCapitalize(category.name)}</TableCell>
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
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                            onClick={() => {
                              handleEdit(category.id);
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
                            onClick={() => {
                              handleDelete(category.id);
                              handleAddLog(`deleted category with name ${category.name}`);
                            }}
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
                    There&apos;s no category
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

CategoryTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  setIsLoading: PropTypes.func,
  setSelectedCategory: PropTypes.func,
  setOpenAddCategoryModal: PropTypes.func,
  searchName: PropTypes.string,
};
