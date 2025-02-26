import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  FormControl,
  FormHelperText,
} from '@mui/material';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(''); // メールアドレスの状態管理
  const [password, setPassword] = useState(''); // パスワードの状態管理
  const [error, setError] = useState(''); // エラーメッセージの状態管理

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください');
      return;
    }

    // 簡単なメールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('正しいメールアドレスを入力してください');
      return;
    }

    // ここにAPI呼び出しを実装
    console.log('ログイン試行:', { email, password });
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
          ログイン
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

          {/* ログインボタン */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            ログイン
          </Button>
        </form>

        {/* パスワード忘れリンク */}
        <Box mt={2}>
          <Link href="#" variant="body2">
            パスワードを忘れた場合
          </Link>
        </Box>

        {/* 新規登録リンク */}
        <Box mt={2}>
          <Typography variant="body2" align="center">
            アカウントをお持ちでない場合&nbsp;
            <Link href="/register" variant="body2">
              新規登録
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};