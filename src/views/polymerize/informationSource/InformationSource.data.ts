import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '信源名称',
    align:"center",
    dataIndex: 'name'
  },
  {
    title: '域名',
    align:"center",
    dataIndex: 'domain'
  },
  {
    title: '协议',
    align:"center",
    dataIndex: 'scheme'
  },
  {
    title: '端口',
    align:"center",
    dataIndex: 'port'
  },
  {
    title: '排序',
    align:"center",
    sorter: false,
    dataIndex: 'rank'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "信源名称",
    field: 'name',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "域名",
    field: 'domain',
    component: 'Input',
    colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    field: 'categoryIds',
    component: 'JTreeSelect',
    label: '选择分类',
    // helpMessage: ['component模式'],
    componentProps: {
      dict: "polymerize_category, category_name, id",
      pidField: "pid",
      pidValue: "0",
      hasChildField: "has_child",
      // converIsLeafVal: 1,
      multiple: true,
    },
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请选择分类!'},
      ];
    },
  },
  {
    label: '信源名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入信源名称!'},
      ];
    },
  },
  {
    label: '排序',
    field: 'rank',
    component: 'InputNumber',
  },
  {
    label: '域名',
    field: 'domain',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入域名!'},
      ];
    },
  },
  {
    label: '协议',
    field: 'scheme',
    component: 'Input',
  },
  {
    label: '端口',
    field: 'port',
    component: 'InputNumber',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];



/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
