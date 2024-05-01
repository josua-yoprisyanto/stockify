import { Box, Divider, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { getPrice } from "src/utils/getPrice";

const StockDetailModal = ({ open, handleClose, selectedProduct }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          borderRadius: 2,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <Typography
          color="neutral.100"
          variant="subtitle2"
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            width: "100%",
            color: "black",
            fontWeight: "600",
          }}
        >
          Product Detail
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            pt: 3,
          }}
        >
          <Typography sx={{ width: "25%" }}>Name</Typography>
          <Typography>{selectedProduct.name}</Typography>
        </Stack>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            pt: 3,
          }}
        >
          <Typography sx={{ width: "25%" }}>Description</Typography>
          <Typography>{selectedProduct.description}</Typography>
        </Stack>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            pt: 3,
          }}
        >
          <Typography sx={{ width: "25%" }}>Category</Typography>
          <Typography>{selectedProduct.category}</Typography>
        </Stack>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            pt: 3,
          }}
        >
          <Typography sx={{ width: "25%" }}>Price</Typography>
          <Typography>{getPrice(selectedProduct.price)}</Typography>
        </Stack>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            pt: 3,
          }}
        >
          <Typography sx={{ width: "25%" }}>Quantity</Typography>
          <Typography sx={{ alignItems: "center" }}>{selectedProduct.quantity}</Typography>
        </Stack>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            pt: 3,
          }}
        >
          <Typography sx={{ width: "25%" }}>Supplier</Typography>
          <Typography>{selectedProduct.supplier}</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default StockDetailModal;
