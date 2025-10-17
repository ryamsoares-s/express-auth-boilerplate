import express from "express";
import "dotenv/config.js";
import Login from "./public/login.js";
import Cadastro from "./public/cadastro.js";
import Usuarios from "./private/usuarios.js";
import auth from "../middlewares/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
