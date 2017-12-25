var express = require('express'); // 加载express模块
var hbs = require('express3-handlebars').create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
var fortune = require('./lib/fortune.js');
var weatherdata = require('./lib/weatherdata.js');
var app = express(); // 创建服务器实例
app.engine('hbs', hbs.engine); // 将express模板引擎配置成handlebars 
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000); // 配置全局变量 post
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});
app.use(function (req, res, next) {
    res.locals.weather = weatherdata.getWeatherData();
    next();
});
app.get('/nursery-rhyme', function (req, res) {
    res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function (req, res) {
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
    });
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
app.get('/jquerytest', function (req, res) {
    res.render('jquerytest');
});
// 定制 404 页面
app.use(function (req, res) {
    res.status(404).render('404');
});
// 定制 500 页面
app.use(function (err, req, res, next) {
    res.status(500).render('500');
});
app.listen(app.get('port'), function () { // 获取全局变量post并作为服务器端口
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});