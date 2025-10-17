import express from "express";
import user from "../../models/user.js";
import password from "../../models/password.js";

const router = express.Router();

const methodNotAllowed = (req, res) => {
  res.setHeader("Allow", "POST");
  res
    .status(405)
    .json({ error: `Método ${req.method} não permitido nesta rota.` });
};

router
  .route("/")
  .post(async (req, res) => {
    try {
      const userInputValues = req.body;

      const userFound = await user.findByEmail(userInputValues);
      if (userFound) {
        throw new Error("Este e-mail já está cadastrado.");
      }

      const hashedPassword = await password.hash(userInputValues.password);

      const newUser = await user.create({
        ...userInputValues,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso!", user: newUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .all(methodNotAllowed);

export default router;
