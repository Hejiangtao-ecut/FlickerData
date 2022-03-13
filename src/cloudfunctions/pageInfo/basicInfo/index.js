const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
    return cloud.database().collection('pageInfo').where({
        pageName: event.pageName
    })
    .get()
}