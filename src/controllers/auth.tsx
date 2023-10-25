import { Elysia, t } from "elysia";
import { LuciaError } from "lucia";
import { ctx } from "../context";
import { googleAuth } from "../auth";
import { serialize } from "bun:jsc";
import { parseCookie } from "lucia/utils";
import { serializeCookie } from "lucia/utils";
import { config } from "../config";
import { redirect, syncIfLocal } from "../lib"
import { OAuthRequestError } from "@lucia-auth/oauth";

class DuplicateEmailError extends Error {
  constructor() {
    super("Duplicate email");
  }
}

export const authController = new Elysia({
  prefix: "/auth",
})
  .use(ctx)
  .get("/signout", async (ctx) => {
    const authRequest = ctx.auth.handleRequest(ctx);
    const session = await authRequest.validate();


    if (!session) {
      redirect({
        set: ctx.set,
        headers: ctx.headers,
      }, "/",);
      return;

    }

    await ctx.auth.invalidateSession(session.sessionId);

    const sessionCookie = ctx.auth.createSessionCookie(null);

    ctx.set.headers["Set-Cookie"] = sessionCookie.serialize();
    redirect({
        set: ctx.set,
        headers: ctx.headers,
    }, "/",);
  })
  .get("/login/google", async ({set}) => {
     const [url, state] = await googleAuth.getAuthorizationUrl(); 
     const state_cooke = serializeCookie("google_auth_state", state, {
        maxAge: 60 * 60,
        httpOnly: true,
        secure: config.env.NODE_ENV === "production",
        path: "/"
     });
     set.headers["Set-Cookie"] = state_cooke;
     set.redirect = url.toString();
  })
  .get("/google/callback", async ({set, query, headers, auth, log}) => {
    const { state, code } = query;
    const cookies = parseCookie(headers["cookie"] || "");
    const state_cookies = cookies["google_auth_state"];
    if (!state_cookies || !code || !state || state_cookies !== state) {
      set.status = "Unauthorized";
    }
    try {
        const { createUser, getExistingUser, googleUser} = await googleAuth.validateCallback(code);
        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser) {
                return existingUser
            }
            const user = await createUser({
                attributes: {
                    name: googleUser.name,
                    email: googleUser.email ?? null,
                    picture: googleUser.picture,
                }
            });
            return user;
            
        };
        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
        const sessionCookie = auth.createSessionCookie(session);
        await syncIfLocal();
        set.headers["Set-Cookie"] = sessionCookie.serialize();
        redirect({
            set: set,
            headers: headers,
        }, "/new-user",);

    } catch (e) {
        log.error(e, "Error authenticating with google");
        if (e instanceof OAuthRequestError) {
            set.status = "Unauthorized";
            return;
        } else {
            set.status = "Internal Server Error";
            return;
        }
    }
  }
  )
