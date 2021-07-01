module.exports = {
    //if app have subdomain
    publicPath: process.env.NODE_ENV === 'production' ? '/cmsApp/' : '/',
    
    //if app no subdomain
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
}