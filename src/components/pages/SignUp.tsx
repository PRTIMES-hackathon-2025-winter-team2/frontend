import { Container, Alert } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const Login = () => {
    return (
        <>
          <Container sx={{ mt: 2 }}>
            <Alert severity="warning" icon={<ErrorOutlineIcon />}>
              ログイン画面
            </Alert>
          </Container>
        </>
      );
}