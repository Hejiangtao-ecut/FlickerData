import { getCloudData } from './common/js/util';
import { USERINFO, REGISTER, USERMESSAGE } from './common/js/type';

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
      wx.cloud.init({
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

    // 获取一次用户信息，不存在则是新用户，注册一下
    getCloudData(USERINFO, {
      type: USERMESSAGE
    }).then(res => {
      if (!res.data[0]) {
        getCloudData(USERINFO, {
          type: REGISTER
        })
      }
    });
  }
});
