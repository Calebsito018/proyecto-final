import dotenv from "dotenv"
dotenv.config()

export default {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URL,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    gmail_user: process.env.GMAIL_USER_NM,
    gmail_password: process.env.GMAIL_PASSWORD_NM,
    node_env: process.env.NODE_ENV,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    domain: process.env.DOMAIN
}