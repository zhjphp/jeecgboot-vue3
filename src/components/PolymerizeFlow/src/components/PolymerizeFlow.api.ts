import { defHttp } from '/@/utils/http/axios';

export enum Api {
  testApi = '/polymerize/informationSourceRule/test',
  configureRuleApi = '/polymerize/informationSourceRule/configureRule',
  getRuleApi = '/polymerize/informationSourceRule/getRule',
  checkListRuleApi = '/polymerize/informationSourceRule/checkListRule',
  checkArticleRuleApi = '/polymerize/informationSourceRule/checkArticleRule',
}
/**
 * 测试接口
 * @param params
 */
export const testApi = (params?) => defHttp.post({ url: Api.testApi, params });

/**
 * 添加规则接口
 * @param params
 */
export const configureRuleApi = (params?) => defHttp.post({ url: Api.configureRuleApi, params });

/**
 * 按信源ID查询规则
 * @param params
 */
export const getRuleApi = (params?) => {
  return defHttp.get({ url: Api.getRuleApi, params }, { joinParamsToUrl: true, isTransformResponse: false });
}

/**
 * 测试列表规则
 * @param params
 */
export const checkListRule = (params?) => {
  return defHttp.post({ url: Api.checkListRuleApi, params, timeout: 180 * 1000 }, { isTransformResponse: false })
}
/**
 * 测试详情规则
 * @param params
 */
export const checkArticleRule = (params?) => {
  return defHttp.post({ url: Api.checkArticleRuleApi, params, timeout: 180 * 1000 }, { isTransformResponse: false })
}


