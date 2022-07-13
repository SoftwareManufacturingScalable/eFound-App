import { ChangeEvent } from "react";

export const fileUpload = async (file: File): Promise<string> => {
  const cloudUrl =
    "https://api.cloudinary.com/v1_1/servidor-depruebas-backend/upload";

  if (!file) throw new Error("No hay archivo seleccionado");

  const formData = new FormData();
  formData.append("upload_preset", "eFound-App");
  formData.append("file", file);

  try {
    const res = await fetch(cloudUrl, { method: "POST", body: formData });
    console.log(res);
    if (!res.ok) throw new Error("No se pudop subir la imagen");
    const respCloud = await res.json();
    console.log({ respCloud });
    return respCloud.secure_url;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
