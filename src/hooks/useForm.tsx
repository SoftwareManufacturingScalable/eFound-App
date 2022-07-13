import { ChangeEvent, useEffect, useMemo, useState } from "react";

export const useForm = <T extends Object>(
  initialForm: T,
  formValidations = {} as any
) => {
  const [formState, setFormState] = useState<any>(initialForm);
  const [formValidation, setFormValidation] = useState({} as any);

  //cada vez que cambiemos algo en el form ejecutamos los validators que yo creé
  useEffect(() => {
    createValidators();
  }, [formState]);
  //este useEffect es para que cada vez que la nota activa cambie actualizamos el formualrio
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  //ahora evaluamos el fomrValidatrion con un for of o forEach
  const isValidForm = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    // console.log(formState);
    // console.log({ name, value });
    return setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {} as any;

    for (const formField of Object.keys(formValidations)) {
      console.log(formField);

      const [fn, errorMessage = "Este campo es requerido"] = formValidations[
        formField
      ] as [fn: (value: string) => boolean, value: string];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues!);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    createValidators,
    ...formValidation,
    formValidation,
    isValidForm,
  };
};
