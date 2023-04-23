import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
    ForeignKey,
    Association,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin,
} from "sequelize";
import { User } from "./User.model";
import { Word } from "./Word.model";
import sequelize from "../sequelize";
import { Rate } from "./Rate.model";
import { ClipReport } from "./ClipReport.model";
import { randomUUID } from "node:crypto";

export class Clip extends Model<InferAttributes<Clip>, InferCreationAttributes<Clip>> {
    declare id: CreationOptional<string>;
    declare clipName: string;
    declare accept: Boolean;
    declare reject: Boolean;

    declare user: NonAttribute<User>;
    declare userId: ForeignKey<User["id"]>;

    declare word: NonAttribute<Word>;
    declare wordId: ForeignKey<Word["id"]>;

    declare reports: NonAttribute<ClipReport[]>;
}

Clip.init(
    {
        accept: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: randomUUID,
            unique: true,
            allowNull: false,
        },
        clipName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reject: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: true,
            onDelete: "SET NULL",
        },
        wordId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            onDelete: "CASCADE",
        },
    },
    { sequelize }
);
