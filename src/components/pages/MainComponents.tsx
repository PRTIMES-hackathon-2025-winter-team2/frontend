import { Typography, Container, Button, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useUserInfo } from "./hooks/useUserInfo";

export const MainComponent = () => {
  const { userId } = useParams();
  const userInfo = useUserInfo(userId || "");
  return (
    <Container sx={{ mt: 2 }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h2">{userInfo.name}さんのマイページ</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "pink", // ボタンの背景色
            "&:hover": { backgroundColor: "hotpink" }, // ホバー時の背景色
          }}
          component={Link}
          to={`/input/${userId}`}
        >
          Dream Tree 作成画面へ
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "pink", // ボタンの背景色
            "&:hover": { backgroundColor: "hotpink" }, // ホバー時の背景色
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
