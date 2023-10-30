import Elysia from "elysia";
import { newRoute } from "./new";
import { id } from "./<id>";

export const ticket = new Elysia()
    .use(id)
    .use(newRoute);
