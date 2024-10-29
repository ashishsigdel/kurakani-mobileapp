const Connection = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "Connection",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      friendId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      conversationId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      lastMessageAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      lastMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isSendByme: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

export default Connection;
