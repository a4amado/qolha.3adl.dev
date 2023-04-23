import { randomUUID } from "crypto";

import { InferCreationAttributes, InferAttributes, Model, CreationOptional, DataTypes, NonAttribute, ForeignKey, Association, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, Attributes, InitOptions, ModelAttributes, ModelStatic, Optional, HasOne, HasOneOptions } from "sequelize";
import { Account } from "./Account.model";
import { Clip } from "./Clip.model";
import { Word } from "./Word.model";
import sequelize from "../sequelize";
import { Rate } from "./Rate.model";
import { WordReport } from "./WordReport.model";
import { ClipReport } from "./ClipReport.model";


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare email: string;
    declare emailVerified: CreationOptional<Date>;
    declare image: CreationOptional<string>;
    declare code: CreationOptional<string>;
    declare role: "owner" | "admin" | "user";
    declare account: NonAttribute<Account>
    declare accountId: ForeignKey<Account["id"]>
    declare words: NonAttribute<Word[]>
    declare clips: NonAttribute<Clip[]>
    declare rates: NonAttribute<Clip[]>
    declare reports: NonAttribute<WordReport[]>
    declare clip_reports: NonAttribute<ClipReport>
};
User.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: randomUUID,
        unique: true,
        allowNull: false
    },
    code: {
        type:DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING
    },
    emailVerified: {
        type: DataTypes.DATE,
        allowNull: true
    },
    image: {
        type:  DataTypes.STRING,
        allowNull: true
    },
    name: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("owner", "admin", "user"),
        allowNull: false,
        defaultValue: "user"
    },
   

}, { sequelize });

