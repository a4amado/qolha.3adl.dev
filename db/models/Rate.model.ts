import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../sequelize";
import { Clip } from "./Clip.model";
import { User } from "./User.model";
import { Word } from "./Word.model";
import { randomUUID } from "crypto";

export class Rate extends Model<InferAttributes<Rate>, InferCreationAttributes<Rate>> {
    declare id: CreationOptional<string>;
    declare rate: number;

    declare clipId: ForeignKey<Clip["id"]>;
    declare word: NonAttribute<Word>;

    declare userId: ForeignKey<User["id"]>;
    declare user: NonAttribute<User>;

    declare static associations: {
        user: Association<Rate, User>;
        word: Association<Rate, Word>;
    };
}

Rate.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: randomUUID,
            unique: true,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { sequelize }
);
