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
import { useUpdateDreams } from "../hooks/useUpdate";
import { Modal } from "./Modal";
import { API_PATH } from "../../../App";

export const TreeComponent = () => {
  const { userId, treeId } = useParams();
  // console.log("user" + userId);
  // console.log("tree" + treeId);
  const data = useDreamList(userId || "", treeId || "");
  const { updateDreams } = useUpdateDreams();
  console.log(data);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [tweetTemplate, setTweetTemplate] = useState("");
  const url2 = `http://localhost:3000/trees/${userId}/${treeId}`;
  const url = `${API_PATH}/{夢の内容}/${userId}/${treeId}`;

  const [sakuraVisible, setSakuraVisible] = useState<boolean[]>(
    data.dreams.map((dream) => !!dream.ended_at) // null でなければ true（sakura）
  );

  useEffect(() => {
    if (data.dreams.length > 0) {
      setSakuraVisible(data.dreams.map((dream) => !!dream.ended_at)); // null → false（tubomi）、それ以外 → true（sakura）
    }
  }, [data]);

  // console.log(data.dreams[0]?.ended_at);

  useEffect(() => {
    const updateOffset = () => {
      setBottomOffset(window.innerHeight - 50);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const handleImageClick = (dreamId: string, dreamTitle: string) => {
    updateDreams(userId || "", treeId || "", dreamId);
    // window.location.reload();
    handleOpenModal(dreamTitle, "");
  };

  // モーダルを開く
  const handleOpenModal = (dreamTitle: string, treeTitle: string) => {
    const displayTitle = dreamTitle !== "" ? dreamTitle : treeTitle;
    if (userId) {
      setTweetTemplate(
        `🎉 【お知らせ】 🎉\n「${displayTitle}」 を達成しました！\n\n URL : ${url}`
      );
    }
    setModalOpen(true);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  // Twitterでのシェア処理
  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(
      tweetTemplate.split("\n").slice(0, 2).join(" ")
    )}&hashtags=DreamTree`;
    window.open(twitterUrl, "_blank");
    handleCloseModal();
  };

  return (
    <Container sx={{ mt: 2, position: "relative" }}>
      <Box sx={{ paddingTop: 4, mb: 3 }}>
        <Typography variant="h3" sx={{ color: "pink" }}>
          {data.title}
        </Typography>
      </Box>
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
      {data.dreams.map((dream) => (
        <Box
          key={dream.id}
          sx={{
            position: "absolute",
            top: `${sakuraPositions[dream.position]?.top}vh`,
            left: `${sakuraPositions[dream.position]?.left}vw`,
            width: "180px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 10,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => handleImageClick(dream.id, dream.title)}
        >
          <motion.img
            src={dream.ended_at != null ? sakura : tubomi}
            alt="sakura or tubomi"
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: dream.ended_at != null ? 1.1 : 1, // sakura は少し大きく
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              width: dream.ended_at != null ? "180px" : "100px",
              height: "auto",
              objectFit: "contain",
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
              {dream.title || "夢がまだありません"}
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

      {/* 枝 */}
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

      {/* ツイートボタン */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "pink", // ボタンの背景色
          "&:hover": { backgroundColor: "hotpink" }, // ホバー時の背景色
          position: "fixed",
          bottom: "150px",
          right: "150px",
        }}
        color="primary"
        onClick={() => handleOpenModal("", data.title)}
      >
        ツイートでシェアする
      </Button>

      {/* モーダルウィンドウ */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        tweetTemplate={tweetTemplate}
        handleShare={handleShare}
      />
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
