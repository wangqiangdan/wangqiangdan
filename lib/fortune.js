var fortunes = [
    '幸运1',
    '幸运2',
    '幸运3',
    '幸运4',
    '幸运5'
];
exports.getFortunes = function () {
    var fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    return fortune;
};