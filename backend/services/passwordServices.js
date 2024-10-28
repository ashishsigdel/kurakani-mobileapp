import bcrypt from "bcrypt";

const saltRound = 10;

export const hashPassword = async (password) => {
  if (!password) return null;
  try {
    return await bcrypt.hash(password, saltRound);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) return false;
  return await bcrypt.compare(password, hashedPassword);
};
