import express from "express";
import Login from "../routes/public/login.js";
import Cadastro from "../routes/public/cadastro.js";
import Usuarios from "../routes/private/usuarios.js";
import auth from "../middlewares/auth.js";

const app = express();
app.use(express.json());

const publicRoutes = express.Router();
publicRoutes.use("/cadastro", Cadastro);
publicRoutes.use("/login", Login);

const privateRoutes = express.Router();
privateRoutes.use("/usuarios", Usuarios);

app.use("/api/public", publicRoutes);
app.use("/api/private", auth, privateRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
});

export default app;
