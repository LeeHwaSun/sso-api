const jwt = require('../../plugins/jwt')

module.exports = async (ctx, next) => {
    const { socketToken } = ctx.request.body;
    if (!socketToken) {
        throw new Error('소켓 Token이 가 없습니다.');
    }

    const socketId = jwt.getSocketId(socketToken);
    if (!socketId) {
        throw new Error('소켓 토큰 인증이 실패')
    }

    let token = await $DB.token.findByPk(socketId, {
        attributes: ['token']
    });

    if (!token) {
        throw new Error('로그인 되어있지 않습니다.');
    }

    token = token.token;
    const encoded = jwt.verify(token);
    const member = await $DB.member.findByPk(encoded.id);

    return { token, member };
}