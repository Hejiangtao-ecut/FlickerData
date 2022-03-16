/**
 * @author hejiangtao
 * @doc toast 类型选择，将部分通用情况的 toast 收敛
 */

/**
 * @doc 网络请求错误 toast
 */
export function showRequestErrToast() {
    wx.showToast({
        title: '网络异常',
        icon: 'error',
        duration: 2000
    });
}