import { Elysia } from "elysia";
import { ctx } from "../context";
import { redirect } from "../lib";
import { BaseHtml } from "../components/base";

export const newUser = new Elysia()
.use(ctx)
.get("/new-user", async ({ html, session, set, headers }) => {
    if (!session) {
        redirect({set, headers}, "/login");
        return;
    }
    
    return html(() =>
    <BaseHtml>
    <div>
        <h1 safe>hi new user {session.user.name}</h1>
        <p>Do you want to join or create an organization?</p>
    </div>
    </BaseHtml>
    );
},);
