const dotenv = require('dotenv');
import { z } from 'zod';
dotenv.config();

export const envSchema = z.object({
  ADMIN_SERVER_PORT: z
    .string()
    .refine(
      (port) => parseInt(port) > 0 && parseInt(port) < 65536,
      'Invalid port number',
    ),
  ADMIN_SERVER_APP_NAME: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  ENCRYPTION_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  REQUEST_LOGIN_TOKEN_EXPIRES_IN: z.string().min(1),
  ACCESS_TOKEN_EXPIRES_IN: z.string().min(1),
  REFRESH_TOKEN_EXPIRES_IN: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;
export const ENV: Env = envSchema.parse(process.env);
export const config = {
  admin_server_port: ENV.ADMIN_SERVER_PORT,
  database_url: ENV.DATABASE_URL,
  app_name: ENV.ADMIN_SERVER_APP_NAME,
  encryption_key: ENV.ENCRYPTION_KEY,
  jwt_secret: ENV.JWT_SECRET,
  request_login_token_expires_in: ENV.REQUEST_LOGIN_TOKEN_EXPIRES_IN,
  access_token_expires_in: ENV.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expires_in: ENV.REFRESH_TOKEN_EXPIRES_IN,
};

export type Config = typeof config;

