var express = require('express'); // 加载express模块
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main'
});
var fortune = require('./lib/fortune.js');
var app = express(); // 创建服务器实例
app.engine('handlebars', handlebars.engine); // 将express模板引擎配置成handlebars 
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000); // 配置全局变量 post
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortunes(),
        pageTestScript: '/qa/tests-about.js'
    });
});
app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});
// 定制 404 页面
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});
// 定制 500 页面
app.use(function (err, req, res, next) {
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function () { // 获取全局变量post并作为服务器端口
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});