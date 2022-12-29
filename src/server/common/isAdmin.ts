import { parse } from "cookie";
import { IncomingMessage } from "http";
import { verify } from "jsonwebtoken";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

function getTokenInMiddleware(req: NextApiRequest) {
  const { token } = req.cookies;
  return token;
}

function getTokenInSSR(ctx: GetServerSidePropsContext) {
  const { token } = ctx.req.cookies;
  return token;
}

function verifyToken(token: string) {
  try {
    const v: any = verify(token, process.env.JWT_SECRET);
    if (!v || v.role != "admin") return false;
    return v;
  } catch (error) {
    return false;
  }
}

function isAdminSSR(ctx: GetServerSidePropsContext): any {
  try {
    const token = getTokenInSSR(ctx);
    if (!token) return false;
    const parsedToken = verifyToken(token);
    if (!parsedToken) return false;
    return parsedToken;
  } catch (error) {
    return false;
  }
}

function isAdminMiddleware(req: NextApiRequest): any {
  try {
    const token = getTokenInMiddleware(req);
    if (!token) return false;
    const parsedToken = verifyToken(token);
    if (!parsedToken) return false;
    return parsedToken;
  } catch (error) {
    return false;
  }
}
export const middleware_auth_admin = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  if (!isAdminMiddleware(req)) {
    return res.status(500).send("NotAdmin")
  };

  return next()
}
export default {
  isAdminSSR,
  middleware_auth_admin
};

