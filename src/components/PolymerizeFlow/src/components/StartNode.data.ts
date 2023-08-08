import { FormSchema } from "/@/components/Form";
import {rules} from "/@/utils/helper/validator";
// import { rules } from "/@/utils/helper/validator";

export const formSchema: FormSchema[] = [

  {
    label: '资源屏蔽',
    helpMessage: '指定不加载的资源后缀,如果不指定则默认使用nacos中的配置',
    field: 'disableLoadResource',
    required: false,
    component: 'Input',
    defaultValue: ''
  },

];


