import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Association,
    DataTypes,
} from "sequelize";
import { User } from "./User.model";
import { Clip } from "./Clip.model";
import sequelize from "../sequelize";
import { Account } from "./Account.model";
import zlib from "node:zlib";
import { WordReport } from "./WordReport.model";
import { randomUUID } from "node:crypto";

export class Word extends Model<InferAttributes<Word>, InferCreationAttributes<Word>> {
    declare ar: string;
    declare id: CreationOptional<string>;
    declare accepted: boolean;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User["id"]>;
    declare user: NonAttribute<User>;
    declare clips: NonAttribute<Clip[]>;
    declare reports: NonAttribute<WordReport[]>;
}

Word.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: randomUUID,
            unique: true,
            allowNull: false,
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        ar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            set(val: string) {
                const description = this.getDataValue("description");
                const compressedDescription = zlib.deflateSync(val).toString("base64");
                this.setDataValue("description", compressedDescription);
            },

            get() {
                const description = this.getDataValue("description");
                const unCompressed = zlib.inflateSync(Buffer.from(description, "base64"));
                return;
            },
        },
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
    },
    { sequelize }
);
