// import { Box } from "@mui/material";
// import { TreeComponent } from "./TreeComponent";


// export const Tree = () => {
//   return (
//     <Box sx={{ background: "#d4f4a1" ,width: "100%", height: "100vh" }}>
//       <TreeComponent />

//     </Box>
//   );
// components/pages/Tree.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { TreeComponent } from './TreeComponent';
import { Modal } from './Modal';
import { useParams } from 'react-router-dom';

export const Tree = () => {
  const { treeId } = useParams<{ treeId: string }>();
  const [open, setOpen] = useState(false);
  const [tweetTemplate, setTweetTemplate] = useState(`🎉 【お知らせ】 🎉\nあなたの夢をSNSで共有しましょう！`);

  useEffect(() => {
    if (treeId) {
      setTweetTemplate(`🎉 【お知らせ】 🎉\nあなたの夢をSNSで共有しましょう！\n\n夢の木: ${treeId}`);
    }
  }, [treeId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShare = () => {
    // Twitter 投稿用のURLを作成
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetTemplate)}`;
    // 新しいタブでTwitter投稿画面を開く
    window.open(twitterUrl, '_blank');
    handleClose();
  };
  // , display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'

  return (
    <Box sx={{ background: '#d4f4a1', width: '100%', height: '100vh' }}>
      <TreeComponent /> {/* ドリームの木のグラフィック */}
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          ツイートでシェアする
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        tweetTemplate={tweetTemplate}
        handleShare={handleShare}
      />
    </Box>
  );
};


// 🎉 【お知らせ】 🎉

// あなたの夢をSNSで共有しましょう！

// [テンプレートプレビュー]
// -------------------------
// [投稿文がプレビュー表示される]
// -------------------------

// ✔ 共有する
// ❌ キャンセル