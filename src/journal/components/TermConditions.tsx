import React, { useEffect, useRef, useState } from "react";

import {
  DialogProps,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Box,
  Checkbox,
  Grid,
} from "@mui/material";
import { PrivacyTip } from "@mui/icons-material";

export const ScrollDialog = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  //este handleClose es para que cuando hagan click en el backDrop o presionen "escape" no puedan salirse del modal
  const handleClose = (e = {}, reason?: string) => {
    if (reason === "backdropClick" || "escapeKeyDown") return;
  };
  //Consiguiente este e spara cerrar el modal clickeando el button
  const closeTermConditions = () => {
    return setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const onChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={(e, reason) => handleClose(e, reason)}
        scroll={scroll}
      >
        <DialogTitle>
          <Box
            sx={{ display: "flex", flexDirection: "row", aligItems: "center" }}
          >
            <PrivacyTip />
            <Typography sx={{ ml: 1 }} component="div" variant="body2">
              Terms and Conditions
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            ref={descriptionElementRef}
            tabIndex={-1}
            component="main"
          >
            <Typography component="div" variant="subtitle2">
              Al usar la aplicacion eFound usted indica que entiende y conoce
              los siguientes puntos de la politica de privacidad.
            </Typography>
            <ul>
              <li>1.El respeto a tu privacidad esta totalmente garantizada.</li>
              <li>
                2. A través de esta aplicación no se recaban datos de carácter
                personal de los usuario
              </li>
              <li> 3 . No se registran direcciones IP</li>
              <li> 4. No se accede a las cuentas de correo de los usuarios.</li>
              <li>
                5. La aplicación no guarda datos ni hace seguimientos sobre
                tiempos y horarios de utilización.
              </li>
              <li>
                6 . aplicación no guarda información relativa a tu dispositivo
                como, por ejemplo, fallos, actividad del sistema, ajustes del
                hardware, tipo de navegador, idioma del navegador.
              </li>
              <li>
                7. La aplicación no recopila información sobre tu ubicación
                real.
              </li>
              <li>
                8. Remarketing con Google AdMob Proveedores como Google,
                utilizan cookies de primer nivel y cookies de terceros u otros
                identificadores de terceros para compilar datos sobre las
                interacciones de los usuarios con las impresiones de anuncios y
                otras funciones de servicio de anuncios.
              </li>
              <li>
                9. Cargos y cuotas: Cualquier uso de esta aplicación es
                totalmente gratuito. 13 - Cambios en nuestra Política de
                Privacidad: Nuestra Política de Privacidad puede cambiar de vez
                en cuando. Publicaremos cualquier cambio de política de
                privacidad en esta página, por lo que debe revisarla
                periódicamente.
              </li>
              <li>
                10. Contacto: Si tiene alguna pregunta sobre esta Política o
                para informar de cualquier violación de la Política, envíe un
                correo electrónico a: perezvluisv@gmail.com
              </li>
            </ul>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Checkbox  checked={isChecked} onChange={onChecked} />
              </Grid>
              <Grid item>
                <Typography>I agree and accept terms and Conditions</Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTermConditions} disabled={!isChecked}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
