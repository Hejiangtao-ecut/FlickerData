const cloud = require('wx-server-sdk');

cloud.init({
    env: 'flickerdata-4ghcwynx39ecd176'
});

exports.main = async (event, context) => {
    return cloud.database().collection("pageInfo")
    .get()
}