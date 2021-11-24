const Phone = require('../../models/phone');

exports.add = async (req, res, next) => {
    const temp = new Phone({
        ...req.body
    });
    try {
        let phone = await Phone.create(temp);
        return res.status(201).json(phone);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const temp = new Phone({
        ...req.body
    });
    try {
        let phone = await Phone.findOne({ _id: temp._id });

        if (phone) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await phone.save();
            return res.status(201).json(phone);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.body;

    try {
        await Phone.deleteOne({ _id: id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let user = await Phone.findById(id);

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}