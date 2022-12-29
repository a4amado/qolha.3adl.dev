import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import StatusCodes from "http-status-codes";

import * as yup from "yup";
import { adminUser } from "../../../../../server/admin";
import isAdmin from "../../../../../server/common/isAdmin";

export default nextConnect()
  .use(isAdmin.middleware_auth_admin)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const schema = yup.object().shape({
        email: yup.string().required().email(),
        uid: yup.string().required(),
        role: yup.string().required(),
      });

      schema.validateSync(req.body);

      // if (req.body.email === process.env.ADMIN_EMAIL) {
      //   return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      //     message: StatusCodes.getStatusText(StatusCodes.UNPROCESSABLE_ENTITY),
      //   });
      // }

      const user = await adminUser.getUser(req.body.uid);

      const isUid = user.uid === req.body.uid;
      const isEmail =
        user.email?.toLocaleLowerCase() === req.body.email.toLocaleLowerCase();

      if (!isUid || !isEmail) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
          message: StatusCodes.getStatusText(StatusCodes.UNPROCESSABLE_ENTITY),
        });
      }

      await adminUser.setCustomUserClaims(req.body.uid, {
        admin: true,
      });

      return res.status(StatusCodes.OK).send({
        message: StatusCodes.getStatusText(StatusCodes.UNPROCESSABLE_ENTITY),
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: StatusCodes.getStatusText(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  });
