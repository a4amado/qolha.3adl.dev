
import { Account } from "./models/Account.model";
import { Clip } from "./models/Clip.model";
import { User } from "./models/User.model";
import { Word } from "./models/Word.model";
import { Rate } from "./models/Rate.model";
import sequelize from "./sequelize";
import { WordReport } from "./models/WordReport.model";
import { ClipReport } from "./models/ClipReport.model";



/**
 * USER
 */
User.hasMany(Clip, {
    foreignKey: "userId"
});
User.hasMany(ClipReport, {
    foreignKey: "userId",
    sourceKey: "id"
})

ClipReport.belongsTo(User, {
    foreignKey: "userId"
})

User.hasMany(Word, {
    sourceKey: "id",
    foreignKey: "userId",
});
User.hasMany(Rate, {
    sourceKey: "id",
    foreignKey: "userId"
});
User.hasMany(WordReport, {
    sourceKey: "id",
    foreignKey: "userId"
});
User.hasOne(Account, {
    sourceKey: "id",
    foreignKey: "userId"
})

Account.belongsTo(User, {
    foreignKey: "userId"
})
Word.hasMany(Clip, {
    sourceKey: "id",
    foreignKey: "wordId"
})
Word.belongsTo(User, { foreignKey: "userId" })
Word.hasOne(WordReport, {
    sourceKey: "id",
    foreignKey: "wordId"
})

Clip.belongsTo(User, { foreignKey: "userId" });
Clip.belongsTo(Word, { foreignKey: "wordId" });


Clip.hasMany(Rate, {
    foreignKey: "clipId",
    sourceKey: "id"
});

Clip.hasMany(ClipReport, {
    sourceKey: "id",
    foreignKey: "clipId"
})

ClipReport.belongsTo(Clip, {
    foreignKey: "clipId"
})


Rate.belongsTo(Clip, { foreignKey: "clipId" })
Rate.belongsTo(User, { foreignKey: "userId" })

WordReport.belongsTo(User, { foreignKey: "userId" })
WordReport.belongsTo(Word, { foreignKey: "wordId" })





export default sequelize
export {
    Account,
    Clip,
    User,
    Word,
    Rate,
    WordReport,
    ClipReport
};
