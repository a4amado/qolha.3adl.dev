import admin from "firebase-admin";
import * as serviceAccount from "../../qolha-372817-firebase-adminsdk-xy46m-4f0e3414cc.json";

export const adminApp = admin.apps[0] || admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

export const adminDB = adminApp.firestore();
export const adminUser = adminApp.auth()
