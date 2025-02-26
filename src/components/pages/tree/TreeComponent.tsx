import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TreeComponent = () => {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      setBottomOffset(window.innerHeight - 50);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <Container sx={{ mt: 2, position: "relative", height: "100vh" }}>
      <Box
        sx={{
          position: "absolute",
          top: `${bottomOffset}px`,
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
          top: `${bottomOffset - 500}px`,
          left: "50%",
          height: "500px",
          backgroundColor: "brown",
          transformOrigin: "bottom center",
          clipPath: "polygon(50% 0%, 90% 100%, 10% 100%)",
          width: "60px",
        }}
      />
      {/* Thin Branches */}
      {[
        { top: -450, left: -50, rotate: -30 },
        { top: -420, left: 50, rotate: 30 },
        { top: -380, left: -70, rotate: -45 },
        { top: -350, left: 70, rotate: 45 },
        { top: -300, left: -90, rotate: -60 },
        { top: -280, left: 90, rotate: 60 },
      ].map((branch, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: `${bottomOffset + branch.top}px`,
            left: `calc(50% + ${branch.left}px)`,
            width: "10px",
            height: "80px",
            backgroundColor: "brown",
            transformOrigin: "bottom center",
            transform: `rotate(${branch.rotate}deg)`,
          }}
        />
      ))}
    </Container>
  );
};
