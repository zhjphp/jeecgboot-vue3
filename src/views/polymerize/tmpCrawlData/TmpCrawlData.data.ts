import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: 'url',
    align:"center",
    dataIndex: 'url'
   },
   {
    title: '标题',
    align:"center",
    dataIndex: 'title'
   },
   {
    title: '日期',
    align:"center",
    dataIndex: 'date',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '来源',
    align:"center",
    dataIndex: 'source'
   },
   {
    title: '信源ID',
    align:"center",
    dataIndex: 'informationsourceid'
   },
   {
    title: '信源任务ID',
    align:"center",
    dataIndex: 'taskid'
   },
   {
    title: '任务调度ID',
    align:"center",
    dataIndex: 'jobid'
   },
   {
    title: '错误数据',
    align:"center",
    dataIndex: 'errorFlag'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "url",
      field: 'url',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "标题",
      field: 'title',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "信源ID",
      field: 'informationsourceid',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "信源任务ID",
      field: 'taskid',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "任务调度ID",
      field: 'jobid',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "错误数据",
      field: 'errorFlag',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: 'url',
    field: 'url',
    component: 'Input',
  },
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '副标题',
    field: 'subtitle',
    component: 'Input',
  },
  {
    label: '关键字',
    field: 'keywords',
    component: 'Input',
  },
  {
    label: '描述',
    field: 'description',
    component: 'Input',
  },
  {
    label: '正文',
    field: 'content',
    component: 'Input',
  },
  {
    label: '日期',
    field: 'date',
    component: 'DatePicker',
  },
  {
    label: '出处',
    field: 'reference',
    component: 'Input',
  },
  {
    label: '来源',
    field: 'source',
    component: 'Input',
  },
  {
    label: '作者',
    field: 'author',
    component: 'Input',
  },
  {
    label: '访问量',
    field: 'visit',
    component: 'Input',
  },
  {
    label: '评论量',
    field: 'comment',
    component: 'Input',
  },
  {
    label: '收藏量',
    field: 'collect',
    component: 'Input',
  },
  {
    label: '信源ID',
    field: 'informationsourceid',
    component: 'Input',
  },
  {
    label: '信源任务ID',
    field: 'taskid',
    component: 'Input',
  },
  {
    label: '任务调度ID',
    field: 'jobid',
    component: 'Input',
  },
  {
    label: '错误数据',
    field: 'errorFlag',
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