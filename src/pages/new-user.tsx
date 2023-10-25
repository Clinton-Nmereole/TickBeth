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
    <main class="flex flex-col items-center py-3 justify-center w-full gap-3">
        <h1 safe class="text-3xl font-bold">hi new user {session.user.name}</h1>
        <p>Do you want to join or create an organization?</p>
        <form class="flex flex-col items-center py-3 justify-center gap-3">
            <input name="organizationName" placeholder="Organization Name" />
            <button type="submit">Create Organization</button>
        </form>
         <form class="flex flex-col items-center py-3 justify-center gap-3">
            <input name="organizationCode" placeholder="Organization Name" />
            <button type="submit">Join Organization</button>
        </form>
    </main>
    </BaseHtml>
    );
},);
