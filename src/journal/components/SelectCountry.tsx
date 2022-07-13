import { useEffect, useState } from "react";

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

import { useForm } from "../../hooks";
import { phoneAndCountriesList } from "../../data";

const FormData = { country: "" };
export const SelectCountry = () => {
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>();

  const {
    onInputChange,
    formState: { country },
  } = useForm(FormData);

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e = {}, reason?: string) => {
    if (reason === "backdropClick" || "escapeKeyDown") return;
  };

  const onSubmit = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (!country) return;
    setFormSubmitted(true);
    setOpen(false);
    console.log({ country });
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add country</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 180, width: "50vw" }}>
              <InputLabel htmlFor="demo-dialog-native">
                Select country
              </InputLabel>
              <Select
                native
                value={country}
                label="country"
                name="country"
                onChange={onInputChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                error={!country && formSubmitted}
              >
                <option aria-label="None" value="" />
                {phoneAndCountriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} disabled={!country}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
