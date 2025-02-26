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

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // メールアドレスの状態管理を追加
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setError('ユーザー名、パスワード、メールアドレスをすべて入力してください');
      return;
    }

    // 簡単なメールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('正しいメールアドレスを入力してください');
      return;
    }

    // ここにAPI呼び出しを実装
    console.log('新規登録:', { username, password, email });
    setError('');
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
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          {/* メールアドレスの入力フィールド */}
          <FormControl fullWidth margin="normal" error={!!error}>
            <TextField
              label="メールアドレス"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>

          {/* 新規登録ボタン */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            新規登録
          </Button>
        </form>

      </Box>
    </Container>
  );
};