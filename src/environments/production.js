import environment from './base';

/*
 * base.js is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'https://dev.video-server.iudx.io:5000';
const env = environment(baseApi);

const productionEnv = {
    ...env,
    // override anything that gets added from base.
};

export default productionEnv;
