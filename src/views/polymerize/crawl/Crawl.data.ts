import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: 'id',
    align:"center",
    dataIndex: 'id',
    width: 180
   },
   {
    title: '名称',
    align:"center",
    dataIndex: 'name',
     width: 180
   },
   {
    title: '仓库地址',
    align:"center",
    dataIndex: 'repository'
   },
   // {
   //  title: '执行指令',
   //  align:"center",
   //  dataIndex: 'runCommand'
   // },
   {
    title: '代码分支',
    align:"center",
    dataIndex: 'branch',
     width: 90
   },
   {
    title: '代码版本号',
    align:"center",
    dataIndex: 'version',
     width: 90
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
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
    label: '仓库地址',
    field: 'repository',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入仓库地址!'},
          ];
     },
  },
  {
    label: '执行指令',
    field: 'runCommand',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入执行指令!'},
          ];
     },
  },
  {
    label: '代码分支',
    field: 'branch',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入代码分支!'},
          ];
     },
  },
  {
    label: '代码版本号',
    field: 'version',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入代码版本号!'},
          ];
     },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
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
