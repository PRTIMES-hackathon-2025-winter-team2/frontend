// components/Modal.tsx
import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
} from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  tweetTemplate: string;
  handleShare: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, tweetTemplate, handleShare }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>🎉 【お知らせ】 🎉</DialogTitle>
      <DialogContent>
        <Typography variant="body1">あなたの夢をSNSで共有しましょう！</Typography>
        <Box mt={2}>
          <Typography variant="subtitle1">[テンプレートプレビュー]</Typography>
          <TextField
            multiline
            rows={4}
            value={tweetTemplate}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 1, backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          ❌ キャンセル
        </Button>
        <Button onClick={handleShare} color="primary" variant="contained">
          ✔ 共有する
        </Button>
      </DialogActions>
    </Dialog>
  );
};