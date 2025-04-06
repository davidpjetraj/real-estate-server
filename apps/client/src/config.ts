import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();
export const envSchema = z.object({
  CLIENT_SERVER_PORT: z
    .string()
    .refine(
      (port) => parseInt(port) > 0 && parseInt(port) < 65536,
      'Invalid port number',
    ),
  CLIENT_SERVER_APP_NAME: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});
type Env = z.infer<typeof envSchema>;
export const ENV: Env = envSchema.parse(process.env);
export const config = {
  client_server_port: ENV.CLIENT_SERVER_PORT,
  database_url: ENV.DATABASE_URL,
  client_app_name: ENV.CLIENT_SERVER_APP_NAME,
};

export type Config = typeof config;
