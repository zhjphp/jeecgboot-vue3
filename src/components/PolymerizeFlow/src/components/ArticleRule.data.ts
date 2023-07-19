import { FormSchema } from "/@/components/Form";
import {rules} from "/@/utils/helper/validator";
// import { rules } from "/@/utils/helper/validator";

export const formSchema: FormSchema[] = [
  {
    label: '测试页URL',
    helpMessage: '此URL仅用于测试规则',
    field: 'checkRuleUrl',
    required: false,
    component: 'Input',
  },
  {
    label: '自定义标签',
    helpMessage: '手工打标',
    field: 'customTags',
    required: false,
    component: 'Input',
  },
  {
    label: '固定单页采集',
    field: 'singleFlag',
    required: true,
    component: 'JSwitch',
    componentProps:{
      options: [true, false],
    },
  },
  {
    label: '单页采集URL',
    helpMessage: '此项仅用于单页固定采集',
    field: 'singleUrl',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件副标题匹配',
    field: 'subtitleMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '查看更多匹配',
    helpMessage: '此项仅可使用xpath匹配',
    field: 'moreButtonMatch',
    required: false,
    component: 'Input',
  },
  // {
  //   label: '稿件关键词匹配',
  //   field: 'keywordsMatch',
  //   required: false,
  //   component: 'Input',
  //   defaultValue: '//meta[@name=\'keywords\']',
  // },
  // {
  //   label: '稿件描述匹配',
  //   field: 'descriptionMatch',
  //   required: false,
  //   component: 'Input',
  //   defaultValue: '//meta[@name=\'description\']',
  // },
  {
    label: '栏目匹配',
    field: 'topicMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '稿件标题匹配',
    field: 'titleMatch',
    required: true,
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
    required: false,
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


