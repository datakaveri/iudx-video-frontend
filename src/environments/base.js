/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 */
export default function baseEnv(baseApi) {
    return {
        route: {
            baseRoute: '/',
        },
        api: {
            server: baseApi,
        },
        isProduction: true,
        isDevelopment: false,
        isTesting: false,
    };
}
