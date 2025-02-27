import { Typography, Container, Button, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useUserInfo } from "./hooks/useUserInfo";

export const MainComponent = () => {
  const { userId } = useParams();
  const userInfo = useUserInfo(userId || "");

  return (
    <Container sx={{ mt: 6 }}>
      <Stack direction="column" spacing={4} alignItems="center">
        <Typography variant="h3">{userInfo.name}さんのマイページ</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "pink",
            "&:hover": { backgroundColor: "hotpink" },
            width: "250px", // ボタンの幅を固定
            maxWidth: "100%", // レスポンシブ対応
          }}
          component={Link}
          to={`/input/${userId}`}
        >
          Dream Tree 作成画面へ
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "pink",
            "&:hover": { backgroundColor: "hotpink" },
            width: "250px", // ボタンの幅を固定
            maxWidth: "100%", // レスポンシブ対応
          }}
          component={Link}
          to={`/trees/${userId}/treeId`}
        >
          Dream Tree 閲覧画面へ
        </Button>
      </Stack>
    </Container>
  );
};
