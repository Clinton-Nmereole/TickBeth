import { Elysia, t } from "elysia";
import { LuciaError } from "lucia";
import { ctx } from "../context";

class DuplicateEmailError extends Error {
  constructor() {
    super("Duplicate email");
  }
}

export const authController = new Elysia({
  prefix: "/auth",
})
  .use(ctx)
  .post("/signout", async (ctx) => {
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
  });
