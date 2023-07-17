
module.exports = (call) => {
    return async (err, req, res, next) => {
        try {
            await call(req, res);
        }
        catch (err) {
            next(err);
        }
    };
}