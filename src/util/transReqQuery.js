module.exports = function(req_query){
  if(!Array.isArray(req_query)){
    return '';
  }
  const obj =  req_query.reduce((prev, next)=>{
    return {
      ...prev,
      [next.name]: getReqQueryType(next)
    };
  },{});
  const resHead = `/**
* query参数 的转换 需要 在“运行” tab页面 配置示例参数.
* 
*/
`;
  const resBody = JSON.stringify(obj).replace(/}/g,";\n}").replace(/{/g,"{\n").replace(/"/g,"").replace(/,/g,";\n");
  const res = `${resHead}type QueryParams = ${resBody}`;
  return res;
}

function getReqQueryType(query){
  const {example} = query;
  if(typeof example !== 'string'){
    return 'string';
  }
  if(['true','false'].includes(example.trim())){
    return 'boolean';
  } else if(parseFloat(example).toString() === example){
    return 'number';
  } else {
    return 'string';
  }
}
