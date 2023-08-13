const jwt = require('../../plugins/jwt');
module.exports = async ctx => {
    const { socketToken } = ctx.request.body;
    if (!socketToken) throw new Error('Socket Token 없음');

    const socketId = jwt.getSocketId(socketToken);
    if (!socketId) {
        throw new Error("소켓 토큰이 올바르지 않음.");
    }

    const row = await $DB.token.destroy({where: {socketId}});
    
    return row == 1;
}