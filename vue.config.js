module.exports = {
    //if app have subdomain
    publicPath: process.env.NODE_ENV === 'production' ? '/appName/' : '/',
    
    //if app no subdomain
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
}