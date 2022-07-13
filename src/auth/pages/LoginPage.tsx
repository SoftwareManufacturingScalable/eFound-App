import { Link as RouterLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { RootState } from "../../store";
import { SkeletonJournal } from "../../components";
import { useForm } from "../../hooks";
import { FormEvent, useMemo, useState } from "react";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginEmailPassword,
} from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
};
export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const dispath = useDispatch() as any;
  //useMemo para quew no tenga que calcular el estatus de nuevo oslo cuando el status cambie
  const isAuthenticating = useMemo(
    (): boolean => status === "checking",
    [status]
  );

  const {
    formState: { email, password },
    onInputChange,
    isValidForm,
    formValidation: { emailValid, passwordValid },
  } = useForm(formData);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isValidForm) return;
    dispath(checkingAuthentication());
    console.log({ email, password });
    return dispath(startLoginEmailPassword(email, password));
  };

  const onGoogleSignIn = () => {
    dispath(startGoogleSignIn());
    // console.log("google");
  };

  return (
    <AuthLayout title={"Login"}>
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              sx={{ mb: 2, mt: 2 }}
              label="Email"
              type="email"
              placeholder="correo@google.com"
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
            <TextField
              label="Password"
              type="password"
              placeholder="*********"
              name="password"
              value={password}
              onChange={onInputChange}
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid
            container
            sx={{ mt: 1 }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sx={{
                display: errorMessage ? "block" : "none",
              }}
            >
              <Alert severity="error">
                {errorMessage?.replace("Firebase", "Alert")}
              </Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
                startIcon={<AccountCircle />}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crea una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
