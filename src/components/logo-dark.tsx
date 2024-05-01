import { Box } from "@mui/material";
import minds_dark from "../../public/minds_dark.png"; // Use a default import

export const LogoDark = () => {
  return (
    <Box
      component="img"
      sx={{
        height: "200%",
        width: "200%",
      }}
      alt="Logo"
      src={minds_dark.src}
    />
  );
};
