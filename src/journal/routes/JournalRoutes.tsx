import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCheckAuth } from "../../hooks";
import { RootState } from "../../store";
import { BooksPage } from "../pages/BooksPage";
import { HomePage } from "../pages/HomePage";
import { InitialPage } from "../pages/InitialPage";

export const JournalRoutes = () => {
  const { verified, phoneNumber } = useSelector(
    (state: RootState) => state.auth
  );
  const { status } = useCheckAuth();
  // TODO: cambiar el emailverified a true en firebase con un dispatch cuando jeectute el getVerified usando alguna funcion de firebase que me permita cambiar el estado del email
  // TODO: agregar un button en odne puedan lois usuarios descargar un archivo PDF y/o enviar al correo electronico con el archivo PDF usando plantilla de firebase
  return (
    <Routes>
      {verified ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/settings" element={<InitialPage />} />
          <Route path="/*" element={<Navigate to="/settings" />} />
        </>
      )}
    </Routes>
  );
};
