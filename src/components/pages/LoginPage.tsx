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
import axios from 'axios';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(''); // メールアドレスの状態管理
  const [password, setPassword] = useState(''); // パスワードの状態管理
  const [error, setError] = useState(''); // エラーメッセージの状態管理

  const handleLogin = async (e: React.FormEvent) => {
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

    try {
      // APIエンドポイントへのリクエスト
      const response = await axios.post('/auth/login', {
        "email":email,
        "password":password,
      }, {
        withCredentials: true, // Cookieを送受信するための設定
      });

      // エラーをクリア
      setError('');

      // ログイン成功時の処理（例: ホームページにリダイレクト）
      console.log('ログイン成功:', { email });
      window.location.href = '/home'; // ホームページに遷移
    } catch (err) {
      // エラーハンドリング
      if (axios.isAxiosError(err)) {
        setError('ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。');
      } else {
        setError('予期しないエラーが発生しました。');
      }
    }
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
              autoFocus // 自動フォーカス
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
            パスワードを忘れた場合(未実装)
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