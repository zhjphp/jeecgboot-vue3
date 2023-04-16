import { defHttp } from '/@/utils/http/axios';

enum Api {
  responseStrin = '/polymerize/test/response_string',
  authPermission = '/polymerize/test/auth_permission',
}

export const responseString = (params) => defHttp.get({ url: Api.responseStrin, params });

export const authPermission = (params) => defHttp.post({ url: Api.authPermission, params });
