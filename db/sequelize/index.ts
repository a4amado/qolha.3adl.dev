import path from "path";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test", "", "", {
    storage: path.join(__dirname, "test.sqlite"),
    dialect: "sqlite"
});

export default sequelize;