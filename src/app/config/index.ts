import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database: process.env.DB_URL,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_TOKEN,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_link: process.env.RESET_PASS_UI_LINK,
  cloud: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
