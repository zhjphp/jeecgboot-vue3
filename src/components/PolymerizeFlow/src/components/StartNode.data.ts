import { FormSchema } from "/@/components/Form";
import {rules} from "/@/utils/helper/validator";
// import { rules } from "/@/utils/helper/validator";

export const formSchema: FormSchema[] = [

  {
    label: '资源屏蔽',
    helpMessage: '指定不加载的资源后缀',
    field: 'disableLoadResource',
    required: true,
    component: 'Input',
    defaultValue: '.*?(\\.jpg)|(\\.JPG)|(\\.PNG)|(\\.png)|(\\.mp3)|(\\.MP3)|(\\.mp4)|(\\.MP4)|(\\.webp)|(\\.flv)|(\\.FLV).*?'
  },

];


