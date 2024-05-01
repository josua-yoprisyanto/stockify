import { Box } from "@mui/material";
import minds_light from "../../public/minds_light.png"; // Use a default import

export const LogoLight = () => {
  return (
    <Box
      component="img"
      sx={{
        height: "200%",
        width: "200%",
      }}
      alt="Logo"
      src={minds_light.src}
    />
  );
};
