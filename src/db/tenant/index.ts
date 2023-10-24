import { createClient, type Config } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { unlinkSync } from "fs";




export function getTenantDb({
    dbName,
    authToken,
}: {
    dbName: string;
    authToken: string;
}) {
    const fullUrl = `libsql://${dbName}-clinton-nmereole.turso.io`;
    const tenantClient = createClient({
        url: fullUrl,
        authToken,
    });
    const tenantTb = drizzle(tenantClient, { schema, logger: true });
    
    return {
        tenantClient,
        tenantTb,
    }
};

export async function pushToTenantDb({
    dbName,
    authToken,
    input,
}: {
    dbName: string;
    authToken: string;
    input?: boolean;
}) {
    const tempConfigPath = "./src/db/tenant/drizzle.config.ts";
    const configText = `
    export default {
        schema: "./src/db/tenant/schema/index.ts",
        driver: "turso",
        dbCredentials: {
            url: "libsql://${dbName}-clinton-nmereole.turso.io",
            authToken: "${authToken}",
        },
        tablesFilter: ["!libsql_wasm_func_table"],
}`;

    await Bun.write(tempConfigPath, configText);

    return new Promise((resolve, reject) => {
        const proc = Bun.spawn([
        'bunx',
        'drizzle-kit',
        'push:sqlite',
        `--config=${tempConfigPath} `
    ], {
        stdout: input ? 'inherit' : undefined,
        stdin: input ? 'inherit' : undefined,
        onExit(subprocess, exitCode, signalCode, error) {
            unlinkSync(tempConfigPath);
            if (exitCode === 0) {
                resolve(void 0);
            } else {
                console.error("Error pushing to tenant db", error);
                reject();
            }
            
        }
        
    });

        
    });
    
};

