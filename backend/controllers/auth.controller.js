import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async(req, res) => {
    try
    {
        const {fullname, username, password, confirmPassword, gender} = req.body;

        if (password !== confirmPassword)
        {
            return res.status(400).json( {error: "Passwords do not match"} )
        }

        const user = await User.findOne({username})

        if (user)
        {
            return res.status(400).json({error:"Username already exists"})
        }

        // Hash Password here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy/username=${username}`
        const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl/username=${username}`

        const newUser = new User(
            {
                fullname,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic
            }
        );

        
        await newUser.save();


        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
        })

    } 
    catch(error)
    {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error lol (check console)"})
    }
}

export const login = (req, res) => {
    console.log("loginUser");
}

export const logout = (req, res) => {
    console.log("logoutUser");
}


    
    
