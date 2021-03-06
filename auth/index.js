const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    let jsonData = JSON.parse(JSON.stringify(data));
    console.log(jsonData);
    return jwt.sign(jsonData, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        
        if(decoded.id !== owner) {
            throw error("No puedes hacer esto, solo el usuario puede realizar esta acción", 401);
        }
    },
    logged: function(req) {
        const decoded = decodeHeader(req);
        console.log(decoded);
    },
}

function getToken(auth) {
    // Bearer $asdasdasdac
    if (!auth) {
        throw error("No viene token", 401);
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw error("Formato de token inválido", 401);
    }
    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check,
}