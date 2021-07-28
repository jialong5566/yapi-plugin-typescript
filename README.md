# yapi-plugin-typescript

Yapi平台插件，构建接口的入参和响应的typescript类型

## 目的

得到接口的query参数数据和请求体数据，已经响应体数据，进行typescript转换，减少ts代码的书写


## 方案

query参数转换依赖于示例参数是否定义，否则全部为string类型，示例参数如果是数字不在示例参数的末尾加不必要的“0”，比如 1 尽量不要写成1.0，boolean类型写true或者false即可，其他情况都视为string

请求体和响应体的格式转换依赖于第三方库json-schema-to-typescript和vscode-json2interface

## 使用

作为Yapi平台插件，接口页面增加tab按钮，点击即可展示，请求体和响应体如果是json-schema格式，可以进行关联接口的生成配置