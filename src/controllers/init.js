const getInit = (req, res, next) => {
    res.render('index.html');
    console.log('getInit');
    //res.send('Hello World! desde el backend');
    next();
};

module.exports = {
    getInit
}
