import { FormEvent, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks";
import {
  checkingAuthentication,
  startRegisterUserEmailPassword,
} from "../../store/auth/thunks";
import { RootState } from "../../store";
import { AccountCircle } from "@mui/icons-material";

const formValidations = {
  name: [
    (value: string): boolean => value.length >= 1,
    "el nombre es obligatorio",
  ],
  email: [
    (value: string): boolean => value.includes("@"),
    "el correo debe tener un @",
  ],
  password: [
    (value: string): boolean => value.length >= 6,
    "el password debe contener al menos 6 caracteres",
  ],
};
export interface FormData {
  name: string | null;
  email: string;
  password: string;
}
const formData: FormData = {
  name: "",
  email: "",
  password: "",
};

export const RegisterPage = () => {
  const dispath = useDispatch() as any;
  const [formSubmitted, setFormSubmitted] = useState<boolean>();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    formState: { name, email, password },
    onInputChange,
    formValidation: { nameValid, emailValid, passwordValid },
    isValidForm,
  } = useForm(formData, formValidations);

  const isAuthenticating = useMemo(
    (): boolean => status === "checking",
    [status]
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, password });
    setFormSubmitted(true);
    if (!isValidForm) return;
    dispath(checkingAuthentication());
    return dispath(startRegisterUserEmailPassword(name, email, password));
  };

  return (
    <AuthLayout title={"Register"}>
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Introduzca su nombre"
              fullWidth
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formSubmitted}
              helperText={nameValid}
            />
            <TextField
              sx={{ mb: 2, mt: 2 }}
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
            <TextField
              label="Password"
              type="password"
              placeholder="*********"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid
            container
            sx={{ mt: 2 }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sx={{ display: errorMessage ? "block" : "none" }}
            >
              <Alert severity="error">
                {errorMessage
                  ? errorMessage!.replace("Firebase", "Alert")
                  : null}
              </Alert>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
                startIcon={<AccountCircle/> }
              >
                Crear una cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
