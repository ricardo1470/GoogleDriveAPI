const getInit = (req, res, next) => {
    res.render('../views/index.html', {title: 'Google Drive API', message: 'esta sera el Index para la API de google Drive'});
    console.log('getInit');
    //res.send('Hello World! desde el backend');
    next();
};

module.exports = {
    getInit
}
