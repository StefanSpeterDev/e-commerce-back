const Cart = require('../../models/cart');

exports.add = async (req, res, next) => {
    const temp = new Cart({
        ...req.body
    });
    try {
        let cart = await Cart.create(temp);
        return res.status(201).json(cart);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let cart = await Cart.findOne({ id_user: id });

        if (cart) {
            return res.status(200).json(cart);
        }
        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.get = async (req, res, next) => {
    try{
        let cart = await Cart.find({});
        if (cart) {
            return res.status(200).json(cart);
        }
        return res.status(404).json('cart trouvés');
    }catch (error) {
        return res.status(501).json(error);
    }
}