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

export const generateOtp = (length) => {
  if (process.env.NODE_ENV === "development") {
    return "123456";
  }
  const digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
};
