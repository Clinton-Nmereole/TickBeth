# This project was created using `create-beth-app`
## To open an issue: https://github.com/ethanniser/the-beth-stack
## To discuss: https://discord.gg/Z3yUtMfkwa

### To run locally:

1. `bun install`
2. create a new turso database with `turso db create <name>`
3. get the database url with `turso db show --url <name>`
4. get the auth token with `turso db tokens create <name>`
5. (optional) create a new github developer app and get credentials
6. copy `.env.example` to `.env`
7. fill out all enviorment variables (refer to the config file to see schema)
8. `bun db:push`
9. `bun dev`

### To deploy to fly.io

1. Install the [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/)

2. Run `fly launch`

3. Run `fly secrets set <NAME>=<VALUE>` (probably want to set `NODE_ENV` to `"production"`)

5. Run `fly deploy`

## What is the BETH stack?

The BETH stack is a group of web technologies/tools for creating web applications. It is the use of:
1. Bun (an all-in-one toolkit for JavaScript and TypeScript apps written in Zig) https://bun.sh/docs
2. Elysia (TypeScript framework supercharged by Bun with End-to-End Type Safety, unified type system and outstanding developer experience) https://elysiajs.com/
3. Turso (Turso is an edge-hosted, distributed database based on libSQL, an open-source and open-contribution fork of SQLite) https://docs.turso.tech/
4. HTMX (htmx gives you access to AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext) https://htmx.org/

## What is TickBeth?

Tickbeth is a ticketing system for organizations and their employees. It allows people who belong to an organization to open issues as tickets and for employees to fix those issues and close said tickets. Tickbeth allows a chat system that allows those with issues to communicate with employees to help fix said issues. One can create their own organization or join an already existing organization through an organization code. Authentication and logins are all handled by Google's OAuth API, and Turso is used as the database service that helps create multiple organizations with each organizations data stored separately from the rest. This project is inspired by github.com/ethanniser and a full tutorial to this project can be found on youtube at https://www.youtube.com/watch?v=NZpPMlSAez0&list=PLbHoFtW5JkYZZ_aawNaCoZ05Qi5fCPVY-&index=47.
