angular.module('myApp')
.factory('Pullup',['dict','$http','cache','localLoad',function(dict,$http,cache,localLoad) {
  var Pullup = function() {
    this.items = new localLoad('zc_NotesVersion','notesList').getData();
    this.busy = false; // 表示当前是否正在加载
    this.after = true; // 表示是否还有下一页
    this.page = 0;
  };

  Pullup.prototype.nextPage = function() {
    if (this.busy || !this.after) {
      return ;
    };
    this.busy = true;
    var _me = this;
    var postData = JSON.parse(JSON.stringify(dict.postData));
    $http.post(dict.notes_url,postData).then(
      function success(res){
        var data = res.data.ajaxRetData;
        if( "00000" === res.data.ajaxRetCode ){
          var items = data.newslist;
          // 更新缓存
          if(data.page === "1"){
            cache.put('zc_NotesVersion',data.newslist[0].createdate+data.newslist[0].createtime);
            cache.put('zc_NotesList',items);
            _me.items = items;
          }else{
            for (var i = 0; i < items.length; i++) {
              _me.items.push(items[i]);
            }
          }
          // 更新标志位
          if(data.page === data.totalpage){
            _me.after = false;
          }
          // 更新页面标志位
          _me.page = parseInt(data.page);

        }
        _me.busy=false;
      },
      function error(res) {
        console.log(" fail --> " + res);
      }
    );



  };
  return Pullup;
}]);
