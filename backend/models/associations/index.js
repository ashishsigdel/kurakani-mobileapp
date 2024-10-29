import userAssociation from "./user.associations.js";
import refreshTokenAssociation from "./refreshToken.associations.js";
import connectionAssociation from "./connectionRequest.association.js";
import connectionRequestAssociation from "./connectionRequest.association.js";
import conversationAssociation from "./conversation.association.js";

export default function associations(db) {
  userAssociation(db);
  refreshTokenAssociation(db);
  connectionRequestAssociation(db);
  connectionAssociation(db);
  conversationAssociation(db);
}
