import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '代理类型',
    align:"center",
    dataIndex: 'type_dictText'
   },
   {
    title: '接口地址',
    align:"center",
    dataIndex: 'apiUrl'
   },
   {
    title: '启用状态',
    align:"center",
    dataIndex: 'status_dictText'
   },
   {
    title: '排序',
    align:"center",
    dataIndex: 'rank'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "名称",
      field: 'name',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "代理类型",
      field: 'type',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "启用状态",
      field: 'status',
      component: 'JSwitch',
      componentProps:{
           options: ['1', '0'],
           query:true,
       },
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入名称!'},
          ];
     },
  },
  {
    label: '代理类型',
    field: 'type',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode:'proxy_type',
      stringToNumber: true,
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入代理类型!'},
          ];
     },
  },
  {
    label: '接口地址',
    field: 'apiUrl',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入接口地址!'},
          ];
     },
  },
  {
    label: 'Bean 名称',
    field: 'beanName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入类全名!'},
          ];
     },
  },
  {
    label: '启用状态',
    field: 'status',
     component: 'JSwitch',
     componentProps:{
       options: ['1', '0'],
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入启用状态!'},
          ];
     },
  },
  {
    label: '排序',
    field: 'rank',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入排序!'},
          ];
     },
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
