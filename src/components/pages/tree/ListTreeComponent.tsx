import { Container, Stack, Typography, Button } from "@mui/material";
import { useTreeList } from "../hooks/useTreeList";
import { useParams } from "react-router-dom";

export const ListTreeComponent = () => {
  const { userId } = useParams();
  const treeList = useTreeList(userId || "");
  console.log(treeList);

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
