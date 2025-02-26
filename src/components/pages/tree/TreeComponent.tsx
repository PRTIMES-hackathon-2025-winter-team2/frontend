import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const dotPositions = [
  { top: 10, left: 40 },
  { top: 15, left: 35 },
  { top: 20, left: 50 },
  { top: 25, left: 30 },
  { top: 30, left: 40 },
  { top: 35, left: 28 },
  { top: 40, left: 50 },
  { top: 45, left: 40 },
  { top: 45, left: 25 },
  { top: 45, left: 50 },
  { top: 45, left: 40 },
  { top: 45, left: 35 },
  { top: 50, left: 48 },
  { top: 53, left: 28 },
  { top: 57, left: 35 },
  { top: 60, left: 40 },
];

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
    <Container sx={{ mt: 2, position: "relative", backgroundColor: "#d4f4a1" }}>
      {/* Green Dots Background */}
      {dotPositions.map((pos, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: `${pos.top}vh`,
            left: `${pos.left}vw`,
            width: "80px",
            height: "80px",
            backgroundColor: "#90ee90",
            borderRadius: "50%",
            opacity: 0.7,
          }}
        />
      ))}
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
      {/* Curved Branches growing from the trunk with decreasing width */}
      {[
        { topOffset: -450, leftOffset: 30, rotate: -25, width: 200 },
        { topOffset: -400, leftOffset: 30, rotate: 25, width: 220 },
        { topOffset: -350, leftOffset: 30, rotate: -25, width: 240 },
        { topOffset: -300, leftOffset: 30, rotate: 25, width: 260 },
        { topOffset: -250, leftOffset: 30, rotate: -25, width: 280 },
        { topOffset: -200, leftOffset: 30, rotate: 25, width: 300 },
      ].map((branch, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            scaleX: 0,
            transform:
              index % 2 === 0
                ? `rotate(${branch.rotate}deg) scaleX(0)`
                : `rotate(${branch.rotate}deg) scaleX(0)`,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
            transform:
              index % 2 === 0
                ? `rotate(${branch.rotate}deg) scaleX(1)`
                : `rotate(${branch.rotate}deg) scaleX(-1)`,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: `${bottomOffset + branch.topOffset}px`,
            left: `calc(50% + ${branch.leftOffset}px)`,
            borderRadius: "50%",
            borderBottom: "5px solid brown",
            width: `${branch.width}px`,
            height: "60px",
            transformOrigin: "left center",
            display: "block",
          }}
        />
      ))}
    </Container>
  );
};
