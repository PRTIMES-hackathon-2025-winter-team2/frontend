import { Box, Container, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { dotPositions } from "./dotPositions";
import { sakuraPositions } from "./sakuraPositions";
import tubomi from "../assets/tubomi.png";
import { branchPositions } from "./branchPositions";
import { useNavigate, useParams } from "react-router-dom";
import { useMakeDreams } from "../hooks/useMakeDreams";
import { Dream } from "../models/Dream";

export const InputTreeComponent = () => {
  const [bottomOffset, setBottomOffset] = useState(0);
  const [dreams, setDreams] = useState<Dream[]>(() =>
    new Array(6).fill(null).map((_, index) => ({
      id: "", // 初期値
      tree_id: "", // 初期値
      position: index, // 配列のインデックスを使う
      title: "", // ここに入力内容を格納
      created_at: "", // 初期値
      ended_at: "", // 初期値
    }))
  );
  const { createDreams } = useMakeDreams();

  const { userId } = useParams();
  const [treeId, setTreeId] = useState<string | null>(null);
  // console.log(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (treeId) {
      navigate(`/trees/${userId}/${treeId}`); // treeIdがセットされたら遷移
    }
  }, [treeId, userId, navigate]);

  useEffect(() => {
    const updateOffset = () => {
      setBottomOffset(window.innerHeight - 50);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedDreams = [...dreams];
    updatedDreams[index] = {
      ...updatedDreams[index], // 既存のプロパティを維持
      title: event.target.value, // title を更新
    };
    setDreams(updatedDreams);
  };

  const handleButtonClick = async () => {
    console.log("Button clicked!");
    try {
      const newTreeId = await createDreams(userId || "", "Dream Tree", dreams);
      console.log(`Created Tree ID: ${newTreeId}`);
      setTreeId(newTreeId); // treeId を更新
    } catch (error) {
      console.error("Failed to create dream tree:", error);
    }
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
            width: "180px", // 幅を統一して中心ズレを防ぐ
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 10,
            transform: "translate(-50%, -50%)", // 中央位置を固定
          }}
        >
          {/* 画像 */}
          <Box
            component="img"
            src={tubomi}
            alt="sakura or tubomi"
            sx={{
              width: "100px",
              height: "auto",
              objectFit: "contain",
              transition: "width 0.3s ease-in-out",
            }}
          />
          {/* 画像上のテキスト (幅を一定にする) */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "180px", // ここで幅を統一
              textAlign: "center",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            <TextField
              id={`dream-${index}`}
              label="あなたの夢は？"
              placeholder="パリに行きたい！"
              multiline
              variant="standard"
              onChange={(e) => handleInputChange(e, index)}
            />
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
      {/* Curved Branches growing from the trunk with decreasing width */}
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
        // component={Link}
        // to={`/trees/${userId}/${treeId}`}
        onClick={handleButtonClick}
      >
        Dream Tree 作成
      </Button>
    </Container>
  );
};
