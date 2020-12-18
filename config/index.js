require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    port: process.env.PORT,
    dbName: process.env.DB_NAME,
    sentryDsn: process.env.SENTRY_DSN,
    sentryId: process.env.SENTRY_ID,
    authAdminUserName: process.env.AUTH_ADMIN_USERNAME,
    authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
    authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
    authJwtSecret: process.env.AUTH_JWT_SECRET
}

module.exports = { config }