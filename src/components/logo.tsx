import { Box } from "@mui/material";
import minds_light from "public/minds_light.png";

export const Logo = () => {
  return (
    <Box
      component="img"
      sx={{
        height: "150%",
        width: "150%",
      }}
      alt="Logo"
      src={minds_light.src}
    />
  );
};
