import Elysia from "elysia";
import { authGroup } from "./(auth)/*";
import { index } from "./index";
import { newUser } from "./new-user";
import { dashboard } from "./dashboard";

export const pages = new Elysia()
.use(index)
.use(authGroup)
.use(newUser)
.use(dashboard);
