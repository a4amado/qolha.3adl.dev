import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"
import { Word } from "./Word.model"
import { randomUUID } from "crypto"
import sequelize from "../sequelize"
 

export class WordReport extends Model<InferAttributes<WordReport>, InferCreationAttributes<WordReport>> {
    declare id: CreationOptional<string>;
    declare word: NonAttribute<Word>;
    declare wordId: ForeignKey<Word["id"]>
    declare reason: string;

 
};


WordReport.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: randomUUID,
        unique: true,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    wordId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: "CASCADE"
    }
}, { sequelize })


