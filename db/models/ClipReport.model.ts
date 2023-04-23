/**
 * id String @unique @default(uuid())
 * clipID String
 * clip Clip @relation(references: [id], fields: [clipID])
 * reason String
 */

import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../sequelize";
import { Clip } from "./Clip.model";
import { randomUUID } from "crypto";

export class ClipReport extends Model<InferAttributes<ClipReport>, InferCreationAttributes<ClipReport>> {
    declare id: CreationOptional<string>;
    declare clip: NonAttribute<Clip>;
    declare clipId: ForeignKey<Clip["id"] | string>;
    declare reason: string;
}

ClipReport.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: randomUUID,
            unique: true,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clipId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            onDelete: "CASCADE",
        },
    },
    { sequelize }
);
