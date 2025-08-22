import { Routes, Route } from "react-router-dom";
import Countries from "./pages/Countries";
import Country from "./pages/Country";
import Login from "./pages/Login";
import { RequireAuth } from "./RequireAuth";
import { GlobalStyle } from "./ui";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Countries />
            </RequireAuth>
          }
        />
        <Route
          path="/countries/:code"
          element={
            <RequireAuth>
              <Country />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}