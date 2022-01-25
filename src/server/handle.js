const { transReqQuery, json2ts, jsonSchema2ts } = require('../util');

const DEFAULT_OPTIONS = {
  $refOptions: {},
  bannerComment: ``,
  cwd: '',
  style: {
    bracketSpacing: false,
    printWidth: 120,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false
  },
  declareExternallyReferenced: true,
  // enableConstEnums: true,
  // format: true,
  ignoreMinAndMaxItems: true,
  // strictIndexSignatures: false,
  
  unreachableDefinitions: false,
  unknownAny: false
}

module.exports = async function(detailObject){
  setReqQueryTypeScript(detailObject);
  await setReqBodyTypeScript(detailObject);
  await setResBodyTypeScript(detailObject);
}

function setTypeScript(detailObject, input){
  detailObject.typescript = {
    ...(detailObject.typescript || {}),
    ...(input || {})
  };
}

function setReqQueryTypeScript(detailObject) {
  const {req_query} = detailObject;
  if(!Array.isArray(req_query) || !req_query.length){
    return;
  }
  
  setTypeScript(detailObject, {
    reqQueryTypeScript: transReqQuery(req_query)
  });
}

async function setReqBodyTypeScript(detailObject){
  const {req_body_other, req_body_is_json_schema} = detailObject;
  if(!req_body_other){
    return;
  }
  let reqBodyTypeScript = null;

  if(!req_body_is_json_schema){
    const tmp = eval(`(${req_body_other})`);
    try {
      reqBodyTypeScript = await json2ts((JSON.stringify(tmp)));
    } catch (error) {
      console.log(error);
    }
  } else {
    let temp = {
      "message": "当前接口typescript转换报错，请联系本包作者"
    };
    try{
      const tmp = eval(`(${req_body_other})`);
      temp = JSON.parse(JSON.stringify(tmp));
    }catch (error) {
      console.log(error);
    }
    temp.title = temp.title || "RootObject";
    reqBodyTypeScript = await jsonSchema2ts(temp, "", DEFAULT_OPTIONS);
  }

  setTypeScript(detailObject, {
    reqBodyTypeScript
  });
}

async function setResBodyTypeScript(detailObject){
  const {res_body, res_body_is_json_schema} = detailObject;
  if(!res_body){
    return;
  }
  let resBodyTypeScript = null;
  if(!res_body_is_json_schema){
    const tmp = eval(`(${res_body})`);
    try {
      resBodyTypeScript = await json2ts((JSON.stringify(tmp)));
    } catch (error) {
      console.log(error);
    }
  } else {
    let temp = {
      "message": "当前接口typescript转换报错，请联系本包作者"
    };
    try{
      const tmp = eval(`(${res_body})`);
      temp  = JSON.parse(JSON.stringify(tmp));
    }catch (e) {
      console.log(detailObject, 'setResBodyTypeScript',e);
    }
    temp.title = temp.title || 'RootObject';
    resBodyTypeScript = await jsonSchema2ts(temp, temp.title, DEFAULT_OPTIONS);
  }

  setTypeScript(detailObject, {
    resBodyTypeScript
  });
}