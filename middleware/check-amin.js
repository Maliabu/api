module.exports = (req, res, next) => {
    try {
        const user = req.body.userData;
        if(user.role =="administrator"){
            next();
        }else{
            return res.status(400).json({
                message: "User access level doesnt allow to perform this action",
            });
        }
        
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed",
            error: error
        });
    }
}