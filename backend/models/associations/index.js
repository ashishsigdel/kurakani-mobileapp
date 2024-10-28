import userAssociation from "./user.associations.js";
import refreshTokenAssociation from "./refreshToken.associations.js";

export default function associations(db) {
  userAssociation(db);
  refreshTokenAssociation(db);
}
