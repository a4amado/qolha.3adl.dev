import { randomUUID } from "crypto";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, Association, DataTypes } from "sequelize";
import { User   } from "./User.model";
import sequelize from "../sequelize";
import { hashSync } from "bcrypt";


export class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    declare id: CreationOptional<string>;
    declare password: string;
    
    declare user: NonAttribute<User>;
    declare userId:  ForeignKey<User["id"] >
 
    
}

Account.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: randomUUID,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        set(val: string) {
            const hash = hashSync(val, 10)
            this.setDataValue("password", hash)
        },
    },

}, { sequelize })



