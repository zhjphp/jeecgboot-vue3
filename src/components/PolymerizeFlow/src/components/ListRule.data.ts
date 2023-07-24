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
    label: '是否为瀑布流',
    field: 'waterfallFlag',
    required: false,
    component: 'JSwitch',
    componentProps:{
      options: [true, false],
    },
  },
  {
    label: '查看更多',
    field: 'moreMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '瀑布流下拉屏数',
    field: 'waterfallPageCount',
    required: false,
    component: 'InputNumber',
  },
  {
    label: '瀑布流结束匹配',
    helpMessage: '此项仅可使用xpath匹配',
    field: 'waterfallBottomMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '列表区块匹配',
    helpMessage: '此项仅可使用xpath匹配',
    field: 'pageMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '是否爬取外链',
    field: 'enableOutside',
    required: false,
    component: 'JSwitch',
    componentProps:{
      options: [true, false],
    },
  },
  {
    label: '稿件url匹配',
    helpMessage: '填写针对列表区块内的匹配规则',
    field: 'articleUrlMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true,
    }
  },
  {
    label: '稿件标题匹配',
    helpMessage: '填写针对列表区块内的匹配规则',
    field: 'articleTitleMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true,
    }
  },
  {
    label: '稿件日期匹配',
    helpMessage: '填写针对列表区块内的匹配规则',
    field: 'articleDateMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true,
    }
  },
  {
    label: '翻页深度',
    helpMessage: '填写此项后,总页数匹配将失效',
    field: 'pageDepth',
    required: false,
    component: 'InputNumber',
  },
  {
    label: '总页数匹配',
    helpMessage: '配置翻页深度,此项将失效',
    field: 'totalPageMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true,
    }
  },
  {
    label: '稿件总数匹配',
    helpMessage: '共多少条',
    field: 'totalCountMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true,
    }
  },
  {
    label: '指定每页条数',
    helpMessage: '配合稿件总数计算总页数,如果不指定则自动计算每页总稿件数量',
    field: 'pageCount',
    required: false,
    component: 'InputNumber',
    componentProps: {
      autosize: true,
    }
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
    component: 'InputTextArea',
    componentProps: {
      autosize: true,
    }
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


