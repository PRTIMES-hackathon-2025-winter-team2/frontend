import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { dotPositions } from "./dotPositions";
import { sakuraPositions } from "./sakuraPositions";
import tubomi from "../assets/tubomi.png";
import sakura from "../assets/sakura_only.png";
import { branchPositions } from "./branchPositions";
import { useParams, Link } from "react-router-dom";
// import { DreamData } from "../models/mockData";
import { useDreamList } from "../hooks/useDreamList";

export const TreeComponent = () => {
  const { userId, treeId } = useParams();
  // console.log("user" + userId);
  // console.log("tree" + treeId);
  const data = useDreamList(userId || "", treeId || "");
  // console.log(data);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [sakuraVisible, setSakuraVisible] = useState<boolean[]>(
    data.dreams.map((dream) => !!dream.ended_at) // null でなければ true（sakura）
  );

  useEffect(() => {
    if (data.dreams.length > 0) {
      setSakuraVisible(data.dreams.map((dream) => !!dream.ended_at)); // null → false（tubomi）、それ以外 → true（sakura）
    }
  }, [data]);

  console.log(data.dreams[0]?.ended_at);

  useEffect(() => {
    const updateOffset = () => {
      setBottomOffset(window.innerHeight - 50);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const handleImageClick = (index: number) => {
    setSakuraVisible((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  return (
    <Container sx={{ mt: 2, position: "relative" }}>
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
      {/* Clickable tubomi images that change to sakura */}
      {sakuraPositions.map((pos, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: `${pos.top}vh`,
            left: `${pos.left}vw`,
            width: "180px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 10,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => handleImageClick(index)}
        >
          <Box
            component="img"
            src={sakuraVisible[index] ? sakura : tubomi}
            alt="sakura or tubomi"
            sx={{
              width: sakuraVisible[index] ? "180px" : "100px",
              height: "auto",
              objectFit: "contain",
              transition: "width 0.3s ease-in-out",
            }}
          />
          {/* 画像上のテキスト */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "180px",
              textAlign: "center",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
                textAlign: "center",
                textShadow: `
            2px 2px 3px rgba(255, 105, 180, 0.8),  
            -2px -2px 3px rgba(255, 105, 180, 0.8),
            0px 0px 6px rgba(255, 182, 193, 1)
          `,
                fontWeight: "bold",
              }}
            >
              {data.dreams[index]?.title || "夢がまだありません"}
            </Typography>
          </Box>
        </Box>
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
      {branchPositions.map((branch, index) => (
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

      {/* Button at the bottom right corner */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "pink", // ボタンの背景色
          "&:hover": { backgroundColor: "hotpink" }, // ホバー時の背景色
          position: "fixed",
          bottom: "150px",
          right: "350px",
        }}
        component={Link}
        to={`/home/${userId}`}
        // onClick={handleButtonClick}
      >
        マイページへ戻る
      </Button>
    </Container>
  );
};
