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
      {/* Curved Branches */}
      {[
        { topOffset: -400, leftOffset: -30, rotate: -30 },
        { topOffset: -370, leftOffset: 30, rotate: 30 },
        { topOffset: -340, leftOffset: -50, rotate: -45 },
        { topOffset: -310, leftOffset: 50, rotate: 45 },
        { topOffset: -280, leftOffset: -70, rotate: -60 },
        { topOffset: -250, leftOffset: 70, rotate: 60 },
      ].map((branch, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: `${bottomOffset + branch.topOffset}px`,
            left: `calc(50% + ${branch.leftOffset}px)`,
            borderRadius: "50%",
            borderBottom: "5px solid brown",
            // borderRight: "5px solid brown",
            width: "100px",
            height: "60px",
            // transformOrigin: "left center",
            // transform: `rotate(${branch.rotate}deg)`,
          }}
        />
      ))}
    </Container>
  );
};
