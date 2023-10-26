import { db } from "../primary"
import { pushToTenantDb } from "."

const organizations = await db.query.organizations.findMany();
organizations.forEach(async (org) => {
    await pushToTenantDb({
        dbName: org.database_name,
        authToken: org.database_auth_token,
        input: true,
    });
    console.log("Pushed to tenant db", org.database_name);
    
});
