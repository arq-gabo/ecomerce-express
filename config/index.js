require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    port: process.env.PORT,
    dbName: process.env.DB_NAME,
    sentryDsn: process.env.SENTRY_DSN,
    sentryId: process.env.SENTRY_ID
}

module.exports = { config }