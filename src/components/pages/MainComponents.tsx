import { Box, Container, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

export const MainComponent = () => {
  const { userId } = useParams();
  console.log(userId);
  return (
    <Container sx={{ mt: 2 }}>
      <Box>Main Page</Box>
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
    </Container>
  );
};
