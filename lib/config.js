//Creating and exporting configurations that will listern on both http/https

let environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort' : 9000,
    'httpsPort' : 9001,
    'envName' : 'staging'
};


// Production environment
environments.production = {
    'httpPort' : 9900,
    'httpsPort' : 9901,
    'envName' : 'production'
};

//Determine the environment to use
let curEnvironment =  typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check for correct environment
let exportEnv = typeof(environments[curEnvironment]) == 'object' ? environments[curEnvironment] : environments.staging;

// Export the module
module.exports = exportEnv;