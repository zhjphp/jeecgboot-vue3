import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

export enum Api {

  loadTreeRoot = '/polymerize/category/loadTreeRoot',
  loadTreeChildren = '/polymerize/category/loadTreeChildren',
  loadTreeListByPidCondition = '/polymerize/category/loadTreeListByPidCondition',

  list = '/polymerize/informationSource/list',
  save='/polymerize/informationSource/add',
  edit='/polymerize/informationSource/edit',
  deleteOne = '/polymerize/informationSource/delete',
  deleteBatch = '/polymerize/informationSource/deleteBatch',
  importExcel = '/polymerize/informationSource/importExcel',
  exportXls = '/polymerize/informationSource/exportXls',
}
/**
 * 获取分类字典树列表
 * @param params
 */
export const loadTreeRoot = (params?) => defHttp.get({ url: Api.loadTreeRoot, params });
export const loadTreeChildren = (params?) => defHttp.get({ url: Api.loadTreeChildren, params });
export const loadTreeListByPidCondition = (params?) => defHttp.get({ url: Api.loadTreeListByPidCondition, params });
/**
 * 列表接口
 * @param params
 */
export const list = (params?) => defHttp.get({ url: Api.list, params });

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
