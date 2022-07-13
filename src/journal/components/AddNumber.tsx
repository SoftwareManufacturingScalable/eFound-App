import { useEffect, useMemo, useState } from "react";
import { Alert, TextField, Typography } from "@mui/material";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  DialogActions,
} from "@mui/material";

import { ListCountriesAndPhone, phoneAndCountriesList } from "../../data";
import { useForm } from "../../hooks";
import {
  addPhone,
  addVerificationCode,
  sendErrorMessage,
  startUpdatePhoneNumber,
} from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { startSendCode } from "../../helpers";
import Swal from "sweetalert2";

const FormData = { code: "", phoneNumber: "", verificationCode: "" };
export const AddNumber = () => {
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>();
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    onInputChange,
    formState: { code, phoneNumber, verificationCode },
  } = useForm(FormData);

  const {
    phoneNumber: numberUpdated,
    errorMessage,
    hasError,
  } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch() as any;

  useEffect(() => {
    handleClickOpen();
  }, []);

  useEffect(() => {
    checkingCode();
  }, [hasError]);

  const handleClickOpen = () => {
    setOpen(true);
    // dispatch(startVerifyuser());
  };

  const handleClose = (e = {}, reason?: string) => {
    if (reason === "backdropClick" || "escapeKeyDown") return;
  };

  const newPhoneNumber = `${code + phoneNumber}`;
  const onSubmit = () => {
    if (!code || !phoneNumber) return;
    setFormSubmitted(true);
    console.log(newPhoneNumber);
    dispatch(addPhone(newPhoneNumber));
    dispatch(startUpdatePhoneNumber());
    setIsSendingCode(true);
    // console.log({ code, phoneNumber });
  };

  const checkingCode = () => {
    if (hasError === true) {
      setIsDisabled(false);
      return setOpen(true);
    }

    if (hasError === false) {
      setOpen(false);
      return Swal.fire(
        "¡Verificacion telefonica exitosa!",
        `El numero ${newPhoneNumber} ha sido verificado exitosamente.`,
        "success"
      );
    }
  };

  const startVerifyCode = () => {
    if (!verificationCode) return;
    setIsDisabled(true);
    console.log("verification code", verificationCode);
    setFormSubmitted(true);
    dispatch(addVerificationCode(verificationCode));
    dispatch(startUpdatePhoneNumber());
    // setOpen(false);
  };
  const resendCode = () => {
    dispatch(startSendCode(newPhoneNumber));
  };
  //esta e sla otra forma de eliminar valores repetidos e nu narreglo
  // const newArray = phoneAndCountriesList.map((el) => {
  //   //the Set property ia data structure that let us just storage unique values any type
  //   const codeList = [...new Set(el.code)];
  //   return codeList;
  // });
  // const newArray = new Set(phoneAndCountriesList);
  // const resultList = [...newArray];
  const numbersCodeWithoutRepeat = phoneAndCountriesList.reduce((acc, item) => {
    //delete the code repeats properties
    if (!acc.includes(item.code)) {
      acc.push(item.code);
    }
    return acc;
  }, [] as string[]);

  return (
    <div id="container">
      {isSendingCode && !errorMessage ? (
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Add verification code</DialogTitle>
          <DialogContent>
            <Typography component="div" variant="subtitle2">
              Ingrese el codigo enviado a {`${numberUpdated}`}
            </Typography>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 90 }}>
                <TextField
                  type="text"
                  label="code verification"
                  placeholder="code verification"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={onInputChange}
                  error={!verificationCode && formSubmitted}
                  helperText="Ingresa el codigo de verificacion enviado a tu telefono"
                />
              </FormControl>
              <Alert
                severity="error"
                sx={{ display: errorMessage ? "block" : "none" }}
              >
                {errorMessage?.replace("Firebase", "Alert")}
              </Alert>

              <Button onClick={resendCode} disabled={isDisabled}>
                Reenviar codigo
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={startVerifyCode} disabled={isDisabled}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
            Add phone number
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Code</InputLabel>
                <Select
                  native
                  value={code}
                  name="code"
                  onChange={onInputChange}
                  input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                  error={!code && formSubmitted}
                >
                  <option aria-label="None" value="" />
                  {numbersCodeWithoutRepeat.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField
                  type="text"
                  label="phone number"
                  placeholder="phone number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onInputChange}
                  error={!phoneNumber && formSubmitted}
                  helperText="Debe ingresar un numero telefonico"
                />
              </FormControl>
              <Alert
                severity="error"
                sx={{ display: errorMessage ? "block" : "none" }}
              >
                {errorMessage
                  ?.replace("Firebase", "Alert")
                  .replace("TOO_SHORT", "Error")}
              </Alert>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onSubmit} disabled={!code || !phoneNumber}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
