/**
 * @file type 常量定义合集
 * @author hejiangtao
 */

export interface DATA {
    /**
     * 云函数子类
     */
    type: 'basicInfo' | 'tplInfo' | 'tplData' | 'pageInfo';
    /**
     * 自定义字段
     */
    [key: string]: string;
}

export type Icon = "error" | "success" | "loading" | "none";


/**
 * pageInfo 云函数名称
 */
export const PAGEINFO = 'pageInfo';

/**
 * userInfo 云函数
 */
export const USERINFO = 'userInfo';

/**
 *  页面结构信息
 * */
export const BASICINFO = 'basicInfo';

/**
 * 模板列表信息
 */
export const TPLINFO = 'tplInfo';

/**
 * 模板数据
 */
export const TPLDATA = 'tplData';

/**
 * 获取 openId
 */
export const OPENID = 'openId';

/**
 * inputData 页面
 */
export const INPUTDATA = 'inputData';

/**
 * 获取用户基础信息
 */
export const USERMESSAGE = 'userMessage';

/**
 * 注册新用户
 */
export const REGISTER = 'register';

/**
 * 更换头像
 */
export const UPAVATAR = 'upAvatar';

/**
 * 更改昵称
 */
export const UPNICKNAME = 'upNickName';

/**
 * 用户添加可视化数据
 */
export const ADDUSERECDATA = 'addUserData';

/**
 * 将添加的数据同步到用户名下
 */
export const ADDDATALIST = 'addDataList';

/**
 * 云函数名称
 */
export type CLOUDNAME = 'pageInfo';

/**
 * 获取数据
 */
export const GETDATA = 'getData';

/**
 * 获取 token 地址
 */
export const TOKEN = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=1Hxa7BUZP0EqlWDryQoKEe8i&client_secret=sPCLwXa5VPPEH0pPUNpo3Dw1XtPwtCm0&';

/**
 * 获取表格数据地址
 */
export const FORMDATA = 'https://aip.baidubce.com/rest/2.0/ocr/v1/form?access_token=';