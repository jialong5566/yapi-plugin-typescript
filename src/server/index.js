const controller = require("./controller");

module.exports = function(){
  this.bindHook('add_router', function(addRouter) {
    addRouter({
      controller,
      method: 'get',
      path: 'getApiDetailByListMenu',
      action: 'getApiDetailByListMenu'
    });
    addRouter({
      controller,
      method: 'post',
      path: 'getTypeScriptByApiDetail',
      action: 'getTypeScriptByApiDetail'
    });
  });
}
