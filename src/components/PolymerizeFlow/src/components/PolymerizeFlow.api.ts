import { defHttp } from '/@/utils/http/axios';

export enum Api {

  testApi = '/polymerize/informationSourceRule/test',
  configureRuleApi = '/polymerize/informationSourceRule/configureRule',
  getRuleApi = '/polymerize/informationSourceRule/getRule'

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
  return defHttp.get({ url: Api.getRuleApi, params }, { joinParamsToUrl: true,isTransformResponse: false });
}

