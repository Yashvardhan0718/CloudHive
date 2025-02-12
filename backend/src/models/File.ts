import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./User";

export class File extends Model {
  public id!: number;
  public fileName!: string;
  public contentType!: string;
  public starred!: boolean;
  public readonly userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "File",
    tableName: "files",
    timestamps: true,
  }
);

File.belongsTo(User, { foreignKey: "userId" });
