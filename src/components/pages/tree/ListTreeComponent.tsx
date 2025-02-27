import { Container, Stack, Typography, Button } from "@mui/material";

export const ListTreeComponent = () => {
  return (
    <Container>
      <Stack direction="column" spacing={4} alignItems="center">
        <Typography variant="h3">List</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "pink",
            "&:hover": { backgroundColor: "hotpink" },
            width: "250px", // ボタンの幅を固定
            maxWidth: "100%", // レスポンシブ対応
          }}
          // component={Link}
          // to={`/input/${userId}`}
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
          // component={Link}
          // to={`/list/${userId}`}
        >
          Dream Tree 閲覧画面へ
        </Button>
      </Stack>
    </Container>
  );
};
