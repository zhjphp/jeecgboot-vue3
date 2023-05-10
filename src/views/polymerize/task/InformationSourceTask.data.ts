import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '任务名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '爬虫ID',
    align:"center",
    dataIndex: 'crawlId'
   },
  {
    title: '爬虫名称',
    align:"center",
    dataIndex: 'crawlName'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "任务名称",
      field: 'name',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '任务名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入任务名称!'},
          ];
     },
  },
  // {
  //   label: '爬虫ID',
  //   field: 'crawlId',
  //   component: 'Input',
  // },
  // {
  //   label: '所选信源ID',
  //   field: 'content',
  //   component: 'Input',
  // },
  {
    field: 'crawlId',
    component: 'JSelectCrawl',
    label: '选择爬虫',
    // helpMessage: ['component模式'],
    componentProps: { async: true, showSelectTable: true, isRadioSelection: true},
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请选择爬虫!'},
      ];
    },
  },
  {
    field: 'content',
    component: 'JSelectInformationSourceByCategory',
    label: '选择信源',
    // helpMessage: ['component模式'],
    componentProps: {
      labelKey: 'name',
      rowKey: 'id',
      pageSize: 'pageSize'
    },
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请选目标信源!'},
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
