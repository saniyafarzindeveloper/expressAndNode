import jwt from "jsonwebtoken";

 const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token){
            res.status(401).json({
                success: false,
                message: "User is not authenticated"
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            res.status(401).json({
                success: false,
                message: "Token not valid"
            });
        }

        //decode returns an object after successful execution
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error)
    }
}

export default isAuthenticated;