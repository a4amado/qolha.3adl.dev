export const roles = {
    owner: {
        ar: "كبيرهم الذي علمهم السحر",
    },
    admin: {
        ar: "مسئول",
    },
    user: {
        ar: "مواطن أسمر",
    },
};
export const rolesKeys = Object.keys(roles);
export type rolesType = keyof typeof roles;
