import express from "express";
import password from "../../models/password.js";
import token from "../../models/token.js";
import user from "../../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userInputValues = req.body;

    const userFound = await user.findByEmail(userInputValues);

    const isMatch = await password.compare(
      userInputValues.password,
      userFound.password
    );

    if (!isMatch) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const newToken = await token.generate({ id: userFound.id });

    res
      .status(200)
      .json({ message: "Login realizado com sucesso.", token: newToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.all("{*splat}", (req, res) => {
  res
    .status(405)
    .json({ error: `Método ${req.method} não permitido nesta rota.` });
});

export default router;
