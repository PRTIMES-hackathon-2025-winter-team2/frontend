import { Typography, Container, Button, Stack, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useUserInfo } from "./hooks/useUserInfo";

export const MainComponent = () => {
  const { userId } = useParams();
  const userInfo = useUserInfo(userId || "");

  return (
    <Box sx={{ background: "#d4f4a1", width: "100%", height: "100vh" }}>
      <Container>
        <Stack
          direction="column"
          spacing={4}
          alignItems="center"
          sx={{ paddingTop: 15 }}
        >
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
            to={`/list/${userId}`}
          >
            Dream Tree 閲覧画面へ
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
