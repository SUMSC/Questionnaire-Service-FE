const fs = require('fs');

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('dist/index.html');
};

module.exports = {
    'GET /': main,
};
