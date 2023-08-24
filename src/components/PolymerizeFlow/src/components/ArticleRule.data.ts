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
    label: '测试资源屏蔽',
    helpMessage: '仅限测试使用,指定不加载的资源后缀,如果为空则使用nacos中的配置',
    field: 'checkRuleDisableLoadResource',
    required: false,
    component: 'Input',
    // defaultValue: '.*?(\\.jpg)|(\\.JPG)|(\\.jpeg)|(\\.JPEG)|(\\.PNG)|(\\.png)|(\\.gif)|(\\.GIF)|(\\.mp3)|(\\.MP3)|(\\.mp4)|(\\.MP4)|(\\.webp)|(\\.flv)|(\\.FLV).*?'
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
    label: '适用域名正则',
    helpMessage: '列表对应多个详情规则时可通过此设置加速,如果为空则必会使用此规则,例：[a-zA-Z0-9\\-_]+.baidu.com 可匹配 xxx.baidu.com',
    field: 'ruleSelectByDomainMatch',
    required: false,
    component: 'Input',
  },
  {
    label: '查看更多匹配',
    helpMessage: '此项仅可使用xpath匹配',
    field: 'moreButtonMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '栏目匹配',
    field: 'topicMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件标题匹配',
    field: 'titleMatch',
    required: true,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件正文匹配',
    field: 'contentMatch',
    required: true,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件日期匹配',
    field: 'dateMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件来源匹配',
    field: 'sourceMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '关键词匹配',
    field: 'keywordsMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '描述匹配',
    field: 'descriptionMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件副标题匹配',
    field: 'subtitleMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件出处匹配',
    field: 'referenceMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件作者匹配',
    field: 'authorMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件访问量匹配',
    field: 'visitMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件评论量匹配',
    field: 'commentMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
    }
  },
  {
    label: '稿件收藏量匹配',
    field: 'collectMatch',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autosize: true
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
      language: "text/javascript,application/xml,text/html",
    },
    // defaultValue: '',
    dynamicRules: ({}) => rules.checkJson(false),
  },
];


