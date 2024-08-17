import jwt from "jsonwebtoken"

const protectRoute = (req, res) => 
{
    try {
        const token = req.cookies.jwt
        
    }
    catch (error)
    {
        console.log("Error in protectRoute controller: ", error.message)
        res.status(500).json( { error: "Internal server error (check console)"})
    }
}