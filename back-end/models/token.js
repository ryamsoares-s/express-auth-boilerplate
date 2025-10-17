import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function generate(userInputValues) {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
  }

  const token = jwt.sign({ id: userInputValues.id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

const token = {
  generate,
};

export default token;
