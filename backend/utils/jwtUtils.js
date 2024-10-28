import jwt from "jsonwebtoken";

export const generateToken = ({ payload, expiresIn }) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });

  return token;
};

export const generateRefreshToken = ({ userId }) => {
  return generateToken({
    payload: {
      id: userId,
    },
    expiresIn: "1800sec",
  });
};
export const generateAccessToken = ({ userId, refreshToken }) => {
  return generateToken({
    payload: {
      id: userId,
      rfId: refreshToken,
    },
    expiresIn: "1800sec",
  });
};
