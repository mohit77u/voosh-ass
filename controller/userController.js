const User = require("../model/User");

// home route
exports.home = async(req, res) => {
    return res.send({
        status: true,
        success: true
    })
}
//register
exports.registerNewUser = async(req, res) => {
    try {
        // validations
        if (!req.body.name && !req.body.phone_number && !req.body.password && !req.body.password_confirmation) {
            return res.status(422).json({
                'name': 'Name field is required',
                'phone_number': 'Phone number field is required',
                'password': 'Password field is required',
                'password_confirmation': 'Password confirmation field is required',
            });
        }
        else if (!req.body.name) {
            return res.status(422).json({
                'name': 'Name field is required',
            });
        }
        else if (!req.body.phone_number) {
            return res.status(422).json({
                'phone_number': 'Phone number field is required',
            });
        }
        else if (!req.body.password) {
            return res.status(422).json({
                'password': 'Password field is required'
            });
        }
        else if (!req.body.password_confirmation) {
            return res.status(422).json({
                'password_confirmation': 'Password confirmation field is required'
            });
        }
        // find user by phone number
        let isUser = await User.find({ phone_number: req.body.phone_number });
        // if user found then return response already exists
        if (isUser.length >= 1) {
            return res.status(409).json({
                'message': 'Phone number already in use'
            });
        }
        // create new user
        const user = new User({
            name: req.body.name,
            phone_number: req.body.phone_number,
            password: req.body.password
        });
        let data = await user.save();
        // const token = await user.generateAuthToken();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({
            'message': 'Error on creating user, please check and try again'
        });
    }
};

//login
exports.loginUser = async(req, res) => {
    try {
        const phone = req.body.phone_number;
        const password = req.body.password;
        //validations
        if (!phone && !password) {
            return res.status(422).json({
                'phone_number': 'Phone number field is required',
                'password': 'Password field is required'
            });
        }
        else if (!phone) {
            return res.status(422).json({
                'phone_number': 'Phone number field is required',
            });
        }
        else if (!password) {
            return res.status(422).json({
                'password': 'Password field is required'
            });
        }

        console.log(phone, password);
        // find user by credentials
        const user = await User.findByCredentials(phone, password);
        if (!user) {
            return res
                .status(409)
                .json({ 
                    'error': "User with this phone number does not exists !!!" 
                });
        }
        // generate token for user
        const token = await user.generateAuthToken(); 

        // return response with suer and user token
        res.status(200).json({ 
            'user' : user, 
            'token': token 
        });
    } catch (err) {
        // return response with error
        res.status(401).json({
            'phone_number': 'Invalid phone or phone is not verified',
            'password': 'Invalid/Incorrect Password'
        });
    }
};

// get logged in user dtails
exports.getUserDetails = async(req, res) => {
    await res.json(req.userData);
};
