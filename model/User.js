const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name field is required"]
    },
    phone_number: {
        type: Number,
        unique: true,
        required: [true, "The phone number field is required"],
    },
    password: {
        type: String,
        required: [true, "The password field is required"]
    },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
}, { timestamps: true });

// save password bycrypted form
userSchema.pre("save", async function(next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id, name: user.name, phone_number: user.phone_number },
        "secret"
    );
    // user.tokens = user.tokens.concat({ token });
    // await user.save();
    return token;
};

// search for a user by phone and password.
userSchema.statics.findByCredentials = async(phone_number, password) => {

    console.log(phone_number, password);
    const user = await User.findOne({ phone_number: phone_number });
    if (!user) {
        throw new Error({ error: "Invalid login details" });
    }
    console.log(user)
    // check bcrypted password and user password is matched or not for login user
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: "Invalid login details" });
    }
    return user;
};

// find user by phone number
userSchema.statics.findByPhone = async(phone) => {
    const user = await User.findOne({ phone });
    if (!user) {
        throw new Error({ error: "User doesn't exists" });
    }
    return user;
};

const User = mongoose.model("users", userSchema);
module.exports = User;