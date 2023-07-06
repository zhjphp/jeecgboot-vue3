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
    title: '爬虫类型',
    align:"center",
    dataIndex: 'type_dictText'
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
    label: '爬虫类型',
    field: 'type',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode:'crawl_type',
      stringToNumber: true,
    },
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请选择爬虫类型!'},
      ];
    },
  },
  {
    label: '仓库地址',
    field: 'repository',
    helpMessage: ['独立爬虫必须填写仓库地址,内置爬虫填写"无"即可'],
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入仓库地址!'},
          ];
     },
  },
  {
    label: '预处理指令',
    field: 'preCommand',
    helpMessage: ['单条指令不要换行,指令间隔使用逗号,爬虫运行指令之前执行,线程安全,用于处理依赖问题,切勿执行爬虫本身,无指令请留空.多条指令换行,内置爬虫填写"无"即可'],
    component: 'InputTextArea',
    componentProps: {
      rows: 3
    },
  },
  {
    label: '运行指令',
    field: 'runCommand',
    helpMessage: ['单条指令不要换行,指令参数间隔使用逗号,多条指令使用分号间隔(可以换行),内置爬虫填写"无"即可'],
    component: 'InputTextArea',
    componentProps: {
      rows: 3
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入运行指令!'},
          ];
     },
  },
  {
    label: '代码分支',
    field: 'branch',
    helpMessage: ['内置爬虫填写"无"即可'],
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
    helpMessage: ['内置爬虫填写"无"即可'],
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
