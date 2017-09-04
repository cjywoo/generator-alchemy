var fs = require('fs');
var path = require('path');
var apimap = require('./data/apimap.js'); // mock数据的map文件
var mockbase = path.join(__dirname, 'data'); // mock数据的地址
var data;

var mockApi = function(res, pathname, paramObj, next) {
  if (apimap[pathname]) {
    // 有此api相应的地址
    console.log('api-success:to ' + apimap[pathname]);
    fs.access(path.join(mockbase, apimap[pathname]), fs.F_OK, function(err) {
      if (err) {
        console.log('api-error:cannot find the file in ' + apimap[pathname]);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify({
          "status": "没有找到此文件",
          "retcode": '404'
        }));
        return;
      }
      data = fs.readFileSync(path.join(mockbase, apimap[pathname]), 'utf-8');
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.end(data);
      return;
    });
  } else {
    // 如果没有相应的api地址
    console.log('api-error:no such api address');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify({
      "status": "没有此api地址",
      "retcode": '404'
    }));
    return;
  }
  //next();
};

module.exports = mockApi;
