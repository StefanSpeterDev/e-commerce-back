const Phone = require('../../models/phone');
const stripe = require('stripe')('sk_test_51K00YHFNBEepFrpOnGcvignzlEMjIceh9Yt8Wh6sQS8KX9Sxk4OHGj0u7ckejSj57r4cHj5nUpcgPBXStnvm7ujT007CRLIrXt');

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

exports.addAll = async (req, res, next) => {
    //req.body.map(element=>function(element){
        try {
            req.body.map(async item => {
                const product = await stripe.products.create({
                    "name": item.name,
                    "description" : item.description
                });
                const price = await stripe.prices.create({
                    product: product.id,
                    currency: 'eur',
                    recurring: {
                        "interval": "week",
                        "interval_count": 1,
                        "usage_type": "licensed"
                    },
                    tax_behavior: "unspecified",
                    unit_amount: ((item.prix/52).toFixed(2))*100,
                });
                const price_month = await stripe.prices.create({
                    product: product.id,
                    currency: 'eur',
                    recurring: {
                        "interval": "month",
                        "interval_count": 1,
                        "usage_type": "licensed"
                    },
                    tax_behavior: "unspecified",
                    unit_amount: ((item.prix/13).toFixed(2))*100,
                });
                const price_an = await stripe.prices.create({
                    product: product.id,
                    currency: 'eur',
                    recurring: {
                        "interval": "year",
                        "interval_count": 1,
                        "usage_type": "licensed"
                    },
                    tax_behavior: "unspecified",
                    unit_amount: ((item.prix/2).toFixed(2))*100,
                });

                //ajout des id des prix pour ce produit puis enregistrement dans mongo
                item["id_price_sem"] = price.id;
                item["id_price_mois"] = price_month.id;
                item["id_price_an"] = price_an.id;
                const temp = new Phone({
                    ...item
                });
                let phone = await Phone.create(temp);
            })
            //let phone =  await Phone.insertMany(req.body);
            return res.status(201).json({"message" : "message réussi"});
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
        let phone = await Phone.findById(id);

        if (phone) {
            return res.status(200).json(phone);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getAll = async (req, res, next) => {
    try{
        let phone = await Phone.find({});
        if (phone) {
            return res.status(200).json(phone);
        }else{
            return res.status(404).json('phones trouvés');

        }
    }catch (error) {
        return res.status(501).json(error);
    }
}