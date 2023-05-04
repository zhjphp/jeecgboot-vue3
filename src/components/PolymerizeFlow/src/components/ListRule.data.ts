import { FormSchema } from "/@/components/Form";
import {rules} from "/@/utils/helper/validator";
// import { rules } from "/@/utils/helper/validator";

export const formSchema: FormSchema[] = [

  // {
  //   label: '匹配方式',
  //   field: 'matchMethod',
  //   component: 'JDictSelectTag',
  //   componentProps: {
  //     dictCode: 'match_method',
  //     placeholder: '请选择匹配方式',
  //     stringToNumber: true,
  //   },
  //   colProps: { span: 6 },
  // },

  {
    label: '起始URL集合',
    helpMessage: '填入完整URL，多个之间用逗号间隔，回车可换行',
    field: 'startUrls',
    required: true,
    component: 'InputTextArea',
    componentProps: {
      autosize: true,
      rows: 3
    }
  },
  {
    label: '通用分页匹配',
    field: 'pageMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '上一页按钮匹配',
    field: 'preMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '下一页按钮匹配',
    field: 'nextMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件url匹配',
    field: 'articleUrlMatch',
    required: true,
    component: 'Input',
  },
  {
    label: '稿件标题匹配',
    field: 'articleTitleMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件日期匹配',
    field: 'articleDateMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '自定义配置',
    helpMessage: '使用JSON格式，[TAB]键自动排版',
    field: 'customConfig',
    required: false,
    component: 'JCodeEditor',
    colProps: {
      span: 24,
    },
    componentProps: {
      // height: '2',
      theme: 'idea',
      language: "text/javascript,application/xml,text/htmln",
    },
    dynamicRules: ({}) => rules.checkJson(false),
  },
];


