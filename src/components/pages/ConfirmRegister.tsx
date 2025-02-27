// components/pages/ConfirmRegister.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  Alert,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // バックエンドのポート番号を指定
  withCredentials: true, // Cookieを送受信するための設定
});

export const ConfirmRegister: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { username, email, password } = state || {};

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleConfirmRegister = async () => {
    try {
      const response = await apiClient.post('/auth/register', {
        email,
        password,
        username,
      });
      // エラーをクリア
      setError('');
      // 成功メッセージを設定
      setSuccess('登録が成功しました。ログインページに移動します...');
      // 登録成功時の処理（例: ログインページにリダイレクト）
      console.log('登録成功:', { email, username });
      setTimeout(() => {
        navigate('/login'); // ログインページに遷移
      }, 2000); // 2秒後に遷移
    } catch (err) {
      // エラーハンドリング
      if (axios.isAxiosError(err)) {
        setError('登録に失敗しました。既に使用されているメールアドレスかもしれません。');
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
          確認
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
        <form style={{ width: '100%' }}>
          {/* メールアドレスの表示 */}
          <FormControl fullWidth margin="normal" error={!!error}>
            <TextField
              label="メールアドレス"
              variant="outlined"
              value={email}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
          {/* ユーザー名の表示 */}
          <FormControl fullWidth margin="normal" error={!!error}>
            <TextField
              label="ユーザー名"
              variant="outlined"
              value={username}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
          {/* パスワードの表示 */}
          <FormControl fullWidth margin="normal" error={!!error}>
            <TextField
              label="パスワード"
              type="password"
              variant="outlined"
              value={password}
              InputProps={{
                readOnly: true,
              }}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
          {/* 確認ボタン */}
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleConfirmRegister}
            disabled={!!success} // 成功メッセージがある場合は無効化
          >
            確認して登録
          </Button>
          {/* 戻るボタン */}
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate('/register')}
            disabled={!!success} // 成功メッセージがある場合は無効化
          >
            戻る
          </Button>
        </form>
      </Box>
    </Container>
  );
};