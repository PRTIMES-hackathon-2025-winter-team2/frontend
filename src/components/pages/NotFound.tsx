import { Container, Alert } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const NotFound = () => {
    return (
        <>
          <Container sx={{ mt: 2 }}>
            <Alert severity="warning" icon={<ErrorOutlineIcon />}>
              ページが見つかりません．
            </Alert>
          </Container>
        </>
      );
}