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
    expiresIn: "30d",
  });
};
export const generateAccessToken = ({ userId, refreshTokenId }) => {
  return generateToken({
    payload: {
      id: userId,
      rfId: refreshTokenId,
    },
    expiresIn: "30m",
  });
};

export const verifyToken = ({ token, ignoreExpiration = false }) => {
  return jwt.verify(token, process.env.SECRET_KEY, {
    ignoreExpiration: ignoreExpiration,
  });
};
