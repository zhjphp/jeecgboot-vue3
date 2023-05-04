import { FormSchema } from "/@/components/Form";
import {rules} from "/@/utils/helper/validator";
// import { rules } from "/@/utils/helper/validator";

export const formSchema: FormSchema[] = [

  {
    label: '稿件url匹配',
    field: 'urlMatch',
    required: true,
    component: 'Input',
  },
  {
    label: '稿件标题匹配',
    field: 'titleMatch',
    required: true,
    component: 'Input',
  },
  {
    label: '稿件副标题匹配',
    field: 'subtitleMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件关键词匹配',
    field: 'keywordsMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件描述匹配',
    field: 'descriptionMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件正文匹配',
    field: 'contentMatch',
    required: true,
    component: 'Input',
  },
  {
    label: '稿件日期匹配',
    field: 'dateMatch',
    required: true,
    component: 'Input',
  },
  {
    label: '稿件出处匹配',
    field: 'referenceMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件来源匹配',
    field: 'sourceMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件作者匹配',
    field: 'authorMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件访问量匹配',
    field: 'visitMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件评论量匹配',
    field: 'commentMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件收藏量匹配',
    field: 'collectMatch',
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
      language: "text/javascript,application/xml,text/html",
    },
    // defaultValue: '',
    dynamicRules: ({}) => rules.checkJson(false),
  },
];


