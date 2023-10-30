import { Elysia } from "elysia";
import { ctx } from "../context";
import { BaseHtml } from "../components/base";
import { Dashboard } from "../components/dashboard";
import { redirect } from "../lib";

export const tickets = new Elysia()
    .use(ctx)
    .get("/tickets", async ({ db, session, set, headers, html, config }) => {
        if (!session) {
            redirect({ set, headers }, "/login");
            return;
        }

        const orgId = session.user.organization_id

        if (!orgId) {
            redirect({ set, headers }, "/new-user");
            return;
        }

        const organization = await db.query.organizations.findFirst({
            where: (organizations, { eq }) => eq(organizations.id, orgId),
        });

        if (!organization) {
            redirect({ set, headers }, "/new-user");
            return;
        }
        return html(() => (
            <BaseHtml>
                <Dashboard>
                    test
                </Dashboard>
            </BaseHtml>
        ))
    })
