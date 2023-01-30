const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "The name field is required"]
    },
    phone_number: {
        type: String,
        unique: true,
        required: [true, "The phone number field is required"],
    },
    sub_total: {
        type: String,
        required: [true, "The sub total field is required"]
    },
}, { timestamps: true });


const Order = mongoose.model("orders", orderSchema);
module.exports = Order;