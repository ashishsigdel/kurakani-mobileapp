import jwt from "jsonwebtoken";

export const getAuthToken = (req) => {
  if (
    req &&
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

export const getCookieToken = (req) => {
  if (req && req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken.split(" ")[1];
  }

  return null;
};

export const generateToken = ({ payload, expiresIn }) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });

  return token;
};

export const generateRefreshToken = ({ userId }) => {
  return generateToken({
    payload: {
      id: userId,
    },
    expiresIn: "265d",
  });
};
export const generateAccessToken = ({ userId, refreshTokenId }) => {
  return generateToken({
    payload: {
      id: userId,
      rfId: refreshTokenId,
    },
    expiresIn: "30d",
  });
};

export const verifyToken = ({ token, ignoreExpiration = false }) => {
  return jwt.verify(token, process.env.SECRET_KEY, {
    ignoreExpiration: ignoreExpiration,
  });
};
