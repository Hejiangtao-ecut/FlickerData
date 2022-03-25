import { getCloudData } from './common/js/util';
import {USERINFO, OPENID} from './common/js/type';

App({
  globalData: {
    isAuth: false,
    isWritePhotosAlbum: false,
  },
  onLaunch: async function () {
    // 判断是否存在云能力
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      // 云开发环境初始化
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'flickerdata-4ghcwynx39ecd176',
        traceUser: true,
      });
    }

    // 请求授权信息
    const authList = await wx.getSetting().then(e => e.authSetting);
    this.globalData.isAuth = authList['scope.userInfo'];
    this.globalData.isWritePhotosAlbum = authList['scope.writePhotosAlbum'];
    if (!authList['scope.userInfo']) {
      wx.getUserInfo({
        success: () => {
          this.globalData.isAuth = true;
        }
      })
    }

    // 获取openId
    getCloudData(USERINFO, {
      type: OPENID
    }).then(res => {
      if (res.openid) {
        this.globalData.openid = res.openid;
      }
    })
  }
});
