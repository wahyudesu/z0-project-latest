// src/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { user } from './schema';

export interface Env {
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a database client with postgres.js driver connected via Hyperdrive
		const sql = postgres(env.HYPERDRIVE.connectionString, {
			// Limit the connections for the Worker request to 5 due to Workers' limits on concurrent external connections
			max: 5,
			// If you are not using array types in your Postgres schema, disable `fetch_types` to avoid an additional round-trip (unnecessary latency)
			fetch_types: false,
		});

		// Create the Drizzle client with the postgres.js connection
		const db = drizzle(sql);

		// Sample query to get all users
		const allUsers = await db.select().from(user);

		// Clean up the connection
		ctx.waitUntil(sql.end());

		return Response.json(allUsers);
	},
} satisfies ExportedHandler<Env>;
