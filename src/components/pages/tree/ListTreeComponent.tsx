import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
  Grid2 as Grid,
} from "@mui/material";
import { useTreeList } from "../hooks/useTreeList";
import { useParams, Link } from "react-router-dom";
import dream_tree from "../assets/dream_tree.png";

export const ListTreeComponent = () => {
  const { userId } = useParams();
  const treeList = useTreeList(userId || "");
  console.log(treeList);

  return (
    <Container>
      <Stack
        direction="column"
        spacing={4}
        alignItems="center"
        sx={{ paddingTop: 15 }}
      >
        <Typography variant="h3" sx={{ mt: 3 }}>
          作成した夢の木一覧
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 8 }}>
          <Box
            component="img"
            src={dream_tree}
            alt="dream_tree"
            sx={{
              width: "100px",
              height: "auto",
              objectFit: "contain",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Box
            component="img"
            src={dream_tree}
            alt="dream_tree"
            sx={{
              width: "100px",
              height: "auto",
              objectFit: "contain",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Box
            component="img"
            src={dream_tree}
            alt="dream_tree"
            sx={{
              width: "100px",
              height: "auto",
              objectFit: "contain",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <Box
            component="img"
            src={dream_tree}
            alt="dream_tree"
            sx={{
              width: "100px",
              height: "auto",
              objectFit: "contain",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "pink", // ボタンの背景色
          "&:hover": { backgroundColor: "hotpink" }, // ホバー時の背景色
          position: "fixed",
          bottom: "150px",
          right: "350px",
        }}
        component={Link}
        to={`/home/${userId}`}
        // onClick={handleButtonClick}
      >
        マイページへ戻る
      </Button>
    </Container>
  );
};
