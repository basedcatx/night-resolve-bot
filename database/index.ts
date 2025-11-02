import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import botConfigs from '../config';

const dbClient = postgres(botConfigs.env.db.pool_url, { prepare: false });
export const db = drizzle(dbClient);
