import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";

const branches = [
  { left: "10%", delay: 0 },
  { left: "30%", delay: 0.2 },
  { left: "50%", delay: 0.4 },
  { left: "70%", delay: 0.6 },
  { left: "90%", delay: 0.8 },
];

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
      {branches.map((branch, index) => (
        <motion.div
          key={index}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: branch.delay, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "10px",
            left: branch.left,
            width: "6px",
            height: "100px",
            backgroundColor: "green",
            transformOrigin: "bottom center",
          }}
        />
      ))}
    </Container>
  );
};
