const yapi = require('../../../../server/yapi.js');
const interfaceController = require('../../../../server/controllers/interface.js');
const interfaceCatModel = require('../../../../server/models/interfaceCat.js');
const projectModel = require('../../../../server/models/project.js');
const handle = require('./handle');



interfaceController.prototype.getApiDetailByListMenu = async function(ctx){
  const projectModelInst = yapi.getInst(projectModel);
  const catModelInst = yapi.getInst(interfaceCatModel);

  let project_id = ctx.params.project_id;
  if (!project_id) {
    return (ctx.body = yapi.commons.resReturn(null, 400, '项目id不能为空'));
  }

  let project = await projectModelInst.getBaseInfo(project_id);
  if (!project) {
    return (ctx.body = yapi.commons.resReturn(null, 406, '不存在的项目'));
  }

  try {
    let result = await catModelInst.list(project_id),
      newResult = [];
    for (let i = 0, item, list; i < result.length; i++) {
      item = result[i].toObject();
      list = await this.Model.listByCatid(item._id);
      for (let j = 0; j < list.length; j++) {
        list[j] = list[j].toObject();
        let detail = await this.Model.get(list[j]._id);
        await yapi.emitHook('interface_get', detail);
        const detailObject = detail.toObject();
        try {
          await handle(detailObject);
        } catch (error) {
          console.log(detailObject, 'handle', error);
        }
        list[j] = detailObject;
      }

      item.list = list;
      newResult[i] = item;
    }
    ctx.body = yapi.commons.resReturn(newResult);
  } catch (err) {
    ctx.body = yapi.commons.resReturn(null, 402, err.message);
  }
};

interfaceController.prototype.getTypeScriptByApiDetail = async function(ctx){
  try {
    const newResult = ctx.params;
    try {
      await handle(newResult);
    } catch (error) {
      console.log(newResult, 'handle', error);
    }
    ctx.body = yapi.commons.resReturn(newResult.typescript||{});
  } catch (err) {
    ctx.body = yapi.commons.resReturn(null, 402, err.message);
  }
}

module.exports = interfaceController;
