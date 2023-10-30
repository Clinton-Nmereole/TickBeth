import { Elysia, t } from "elysia";
import { ctx } from "../../../context";
import { BaseHtml } from "../../../components/base";

export const id = new Elysia()
    .use(ctx)
    .get(
        "/:orgId/ticket/:ticketId",
        async ({ db, session, set, headers, html, config, params }) => {
            return html(() => (
                <BaseHtml>
                    <p>{JSON.stringify(params)}</p>
                </BaseHtml>
            ))
        }, {
        params: t.Object({
            orgId: t.Numeric(),
            ticketId: t.Numeric(),
        }),
    },
    );
