const OrderModel = require('../model/Order');

module.exports.addOrder = async(req,res) => {
    try {
        const body = req.body
        //validations
        if (!body.sub_total && !body.phone_number) {
            return res.status(422).send({
                'sub_total': 'Subtotal field is required',
                'phone_number': 'phone number field is required',
            });
        }
        else if (!body.sub_total) {
            return res.status(422).send({
                'sub_total': 'Subtotal field is required',
            });
        }
        else if (!body.phone_number) {
            return res.status(422).send({
                'phone_number': 'phone number field is required',
            });
        }

        // new order save
        const NewOrder = new OrderModel({
            'user_id'       : req.userData._id,
            'sub_total'     : body.sub_total,
            'phone_number'  : body.phone_number,
        });

        let data = await NewOrder.save();

        res.status(200).send({
            'data'      : data,
            'message'   : 'Order added successfully',
        });

    } catch(err) {
        res.status(500).send({
            'error'     : err,
            'message'   : 'Error on adding order'
        });
    }
}

// get order by user id
module.exports.getOrder = async(req,res) => {
    try {
        // const user = req.userData
        const userId = req.params.userId
        console.log(userId)
        OrderModel.find({user_id: userId}, function(err, orders){
            if(err){
                return res.status(500).send({
                    'success'   : false,
                    'error'     : err,
                })
            }

            return res.status(200).send({
                'success'   : true,
                'data'     : orders,
                'message'     : 'Order details found successfully',
            })

        })
    } catch(err) {
        return res.status(500).send({
            'success'   : false,
            'error'     : err,
        })
    }
}