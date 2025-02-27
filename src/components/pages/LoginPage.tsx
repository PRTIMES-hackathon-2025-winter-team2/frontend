// components/pages/LoginPage.tsx
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
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // バックエンドのポート番号を指定
  withCredentials: true, // Cookieを送受信するための設定
});

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(''); // メールアドレスの状態管理
  const [password, setPassword] = useState(''); // パスワードの状態管理
  const [error, setError] = useState(''); // エラーメッセージの状態管理
  const [success, setSuccess] = useState(''); // 成功メッセージの状態管理
  const navigate = useNavigate();

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
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      // エラーをクリア
      setError('');
      // 成功メッセージを設定
      setSuccess('ログインが成功しました。ホーム画面に移動します...');
      // ログイン成功時の処理（例: ホームページにリダイレクト）
      console.log('ログイン成功:', { email });
      setTimeout(() => {
        navigate('/home'); // ホームページに遷移
      }, 2000); // 2秒後に遷移
    } catch (err) {
      // エラーハンドリング
      if (axios.isAxiosError(err)) {
        setError('ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。');
      } else {
        setError('予期しないエラーが発生しました。');
      }
      setSuccess(''); // 成功メッセージをクリア
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
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
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
            disabled={!!success} // 成功メッセージがある場合は無効化
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