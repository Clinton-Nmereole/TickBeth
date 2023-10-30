import Elysia from "elysia";
import { authGroup } from "./(auth)/*";
import { index } from "./index";
import { newUser } from "./new-user";
import { dashboard } from "./dashboard";
import { organization } from "./organization";
import { ticketsRoute } from "./tickets";
import { orgId } from "./<organizationId>/*";

export const pages = new Elysia()
    .use(index)
    .use(orgId)
    .use(ticketsRoute)
    .use(organization)
    .use(authGroup)
    .use(newUser)
    .use(dashboard);
