import {link} from './linker.js';
import {normalize} from './normalizer.js';
import {parse} from './parser.js';
import {optimize} from './optimizer.js';
import {generate} from './generator.js';
import {format} from './formatter.js';

export default function(schema, options={}){
  const linked = link(schema)
  const normalized = normalize(linked, "mySchema", options);
  const parsed = parse(normalized, options);
  const optimized = optimize(parsed);
  const generated = generate(optimized, options);
  const formatted = format(generated, options);
  return formatted;
}

export const DEFAULT_OPTIONS = {
  $refOptions: {},
  bannerComment: `
/**
* typescript 的转换使用了第三方库 json-schema-to-typescript.
*/`,
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
  
  // unreachableDefinitions: false,
  unknownAny: true
}

export const DEFAULT_OPTIONS_LABEL = {
  $refOptions: '引用配置',
  bannerComment: `头部说明`,
  cwd: '当前路径',
  style: '样式配置',
  declareExternallyReferenced: '声明外部引用',
  enableConstEnums: '枚举常量化',
  format: '格式化',
  ignoreMinAndMaxItems: '忽略元素个数的最大最小值',
  strictIndexSignatures: '严格索引标记',
  
  unreachableDefinitions: '不可定义的范围',
  unknownAny: 'unknown转any'
}