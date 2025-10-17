import express from "express";
import user from "../../models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await user.listAll();

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao listar usuários.", error: error.message });
  }
});

router.all("{*splat}", (req, res) => {
  res
    .status(405)
    .json({ error: `Método ${req.method} não permitido nesta rota.` });
});

export default router;
