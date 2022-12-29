

export default function (handler) {
    // A wrapper function for router handler.
    return async (req, res, next) => {
        try {
            await handler(res, req);
        } catch(err) {
            next(err)
        }
    }
}