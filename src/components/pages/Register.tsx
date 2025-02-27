// components/pages/Register.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // パスワード再確認用
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false); // 共通のパスワード表示状態
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword || !email) {
      setError('すべてのフィールドを入力してください');
      return;
    }
    // 簡単なメールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('正しいメールアドレスを入力してください');
      return;
    }
    // パスワードと再確認パスワードが一致するかチェック
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }
    // エラーをクリア
    setError('');
    // 確認画面に遷移
    navigate('/confirm-register', { state: { username, email, password } });
  };

  // パスワード表示/非表示のトグル関数
  const toggleShowPasswords = () => {
    setShowPasswords((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          アカウントの作成
        </Typography>
        <form onSubmit={handleNext} style={{ width: '100%' }}>
          {/* メールアドレスの入力フィールド */}
          <FormControl fullWidth margin="normal" error={!!error}>
            <TextField
              label="メールアドレス"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus // 自動フォーカス
            />
          </FormControl>
          {/* ユーザー名の入力フィールド */}
          <FormControl fullWidth margin="normal" error={!!error}>
            <TextField
              label="ユーザー名"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          {/* パスワードの入力フィールド */}
          <FormControl fullWidth margin="normal" error={!!error}>
            <TextField
              label="パスワード"
              type={showPasswords ? 'text' : 'password'} // 動的にtypeを切り替え
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          {/* パスワード再確認の入力フィールド */}
          <FormControl fullWidth margin="normal" error={!!error}>
            <TextField
              label="パスワード（再確認）"
              type={showPasswords ? 'text' : 'password'} // 動的にtypeを切り替え
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
          {/* パスワード表示/非表示ボタン */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={toggleShowPasswords}
            sx={{ mt: 2 }}
          >
            {showPasswords ? 'パスワードを隠す' : 'パスワードを表示'}
          </Button>
          {/* 次へボタン */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            次へ
          </Button>
        </form>
      </Box>
    </Container>
  );
};