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
    label: '测试页URL',
    helpMessage: '此URL仅用于测试规则',
    field: 'checkRuleUrl',
    required: false,
    component: 'Input',
  },
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
    label: '有效天数',
    helpMessage: '从当前时间开始往前[设定天数]内的数据,0为不限制',
    field: 'effectiveDays',
    required: true,
    component: 'InputNumber',
    defaultValue: 1
  },
  {
    label: '起始时间',
    helpMessage: '时间段设定优先于有效天数',
    field: 'startTime',
    required: false,
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选起始时间',
    },
  },
  {
    label: '截止时间',
    helpMessage: '时间段设定优先于有效天数',
    field: 'endTime',
    required: false,
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择截止时间',
    },
  },
  {
    label: '列表区块匹配',
    field: 'pageMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '总页数匹配',
    field: 'totalPageMatch',
    required: false,
    component: 'Input',
  },
  // {
  //   label: '上一页按钮匹配',
  //   field: 'preMatch',
  //   required: false,
  //   component: 'Input',
  // },
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


