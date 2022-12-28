import admin from "firebase-admin";
import * as serviceAccount from "../../qolha-372817-firebase-adminsdk-xy46m-171f58298f.json";

export const adminApp = admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

export const adminDB = adminApp.firestore();
