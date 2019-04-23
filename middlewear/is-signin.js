const jwt = require("jsonwebtoken");
module.exports = (res, req, next) => {
    const auth = req.get("Authorization");
    if (!auth) {
        req.isAuth = false;
        return next();
    }
    const token = auth.split(' ')[1];
    if (!token) {
        req.isAuth = false;
        return next();
    }
    let verification;
    try {
        verification = jwt.verify(jwt, "fgfg4r54r58r5g");
    } catch (err) {
        throw new Error(err);
    }

    req.isAuth = true;
    req.userId = verification.userId;
    next();
}