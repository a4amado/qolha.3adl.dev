import { log } from "console";
import path from "path";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test", "", "", {
    storage: path.join(process.cwd(), "test.sqlite"),
    dialect: "sqlite",
});

sequelize.sync()
.then(() => {
    log(path.join(process.cwd(), "test.sqlite"))
})
export default sequelize;
