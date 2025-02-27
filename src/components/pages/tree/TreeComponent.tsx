// components/pages/TreeComponent.tsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { dotPositions } from './dotPositions';
import { sakuraPositions } from './sakuraPositions';
import tubomi from "../assets/tubomi.png";
import sakura from "../assets/sakura_only.png";
import { branchPositions } from './branchPositions';
import { useParams } from "react-router-dom";
import { useDreamList } from "../hooks/useDreamList";
import { Modal } from './Modal';

export const TreeComponent = () => {
  // データと状態管理
  const data = useDreamList();
  const [bottomOffset, setBottomOffset] = useState(0);
  const [sakuraVisible, setSakuraVisible] = useState<boolean[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tweetTemplate, setTweetTemplate] = useState('');

  // URLパラメータからユーザーIDを取得
  const { userId } = useParams<{ userId: string }>();

  // 初期化: sakuraVisibleの状態を設定
  useEffect(() => {
    if (data.length > 0) {
      setSakuraVisible(data.map((dream) => dream.ended_at !== ""));
    }
  }, [data]);

  // ウィンドウサイズ変更時のオフセット更新
  useEffect(() => {
    const updateOffset = () => {
      setBottomOffset(window.innerHeight - 50);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // イベントハンドラ: 画像クリックで桜の表示状態を切り替え
  const handleImageClick = (index: number) => {
    setSakuraVisible((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  // モーダルを開く
  const handleOpenModal = () => {
    if (userId) {
      const url = `(実際に使える)https://example.com/trees/${userId}/treeID`; // 実際のURLに置き換えてください
      setTweetTemplate(`🎉 【お知らせ】 🎉\nあなたの夢をSNSで共有しましょう！\n\n夢の木: ${url}`);
    }
    setModalOpen(true);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Twitterでのシェア処理
  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(tweetTemplate.split('\n')[2].split(': ')[1])}&text=${encodeURIComponent(tweetTemplate.split('\n').slice(0, 2).join(' '))}&hashtags=DreamTree`;
    window.open(twitterUrl, '_blank');
    handleCloseModal();
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
              {data[index]?.title || "夢がまだありません"}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* 木の幹 */}
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
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 20,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          ツイートでシェアする
        </Button>
      </Box>

      {/* モーダルウィンドウ */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        tweetTemplate={tweetTemplate}
        handleShare={handleShare}
      />
    </Container>
  );
};