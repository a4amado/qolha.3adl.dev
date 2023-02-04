import admin from "firebase-admin";
import * as serviceAccount from "../../qolha-372817-firebase-adminsdk-0gpbf-5b27d13e47.json";

export const adminApp =
  admin.apps[0] ||
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount),
  });

export const adminDB = adminApp.firestore();
export const adminUser = adminApp.auth();
