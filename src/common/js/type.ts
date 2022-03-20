// 云函数名称
/**
 * pageInfo 云函数名称
 */
export const PAGEINFO = 'pageInfo';

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

export type Icon = "error" | "success" | "loading" | "none";

/**
 * 云函数名称
 */
export type CLOUDNAME = 'pageInfo';

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