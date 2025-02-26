import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";

export const TreeComponent = () => {
  return (
    <Container sx={{ mt: 2, position: "relative", height: "300px" }}>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "10px",
          backgroundColor: "brown",
        }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          width: "10px",
          height: "200px",
          backgroundColor: "brown",
          transformOrigin: "bottom center",
        }}
      />
    </Container>
  );
};
