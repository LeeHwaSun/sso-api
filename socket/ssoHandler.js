const jwt = require('../plugins/jwt');

module.exports = (io, socket) => {
    socket.on('sso:join', async socketToken => {
        const socketId = jwt.getSocketId(socketToken);
        if (!socketId) {
            console.log("소켓 토큰 인증 실패");
            return;
        }
        socket.join(socketId);
    });

    socket.on('sso:login', async (socketToken, token) => {
        try {
            const socketId = jwt.getSocketId(socketToken);
            if (!socketId) {
                console.log("소켓 토큰 인증 실패");
                return;
            }
            const encode = jwt.verify(token);
            if (encode && encode.id) {
                const [ _ , member ] = await Promise.all([
                    $DB.token.upsert({ socketId, token }, { where : socketId }),
                    $DB.member.findByPk( encode.id )
                ])
                socket.to(socketId).emit('sso:login', { token, member });
            }
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('sso:logout', async socketToken => {
        const socketId = jwt.getSocketId(socketToken);
        if (!socketId) {
            console.log("소켓 토큰 인증 실패");
            return;
        }
        socket.to(socketId).emit('sso:logout');
    });
}