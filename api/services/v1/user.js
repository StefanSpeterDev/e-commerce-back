const User = require('../../models/user');
const jwt = require('jsonwebtoken')
const bearer =  require('../../modules/jwtModules')

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res, next) => {
    const temp = {};


    ({
        name     : temp.name,
        firstname: temp.firstname,
        email    : temp.email,
        password : temp.password
    } = req.body);
    console.log(req.body)

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let user = await User.create(temp);

        if(user){
            return res.status(201).json(user);
        }else{
            return res.status(501).json({message: "l utilisateur existe déjà"});
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const temp = {};

    ({
        name     : temp.name,
        firstname: temp.firstname,
        email    : temp.email,
        password : temp.password
    } = req.body);

    try {
        let user = await User.findOne({ email: temp.email });

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.body;

    try {
        await User.deleteOne({ _id: id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.login = async (req, res, next) => {
    const { id } = req.body;
    console.log(req.body.email , req.body.password)


    try {
        // await User.deleteOne({ _id: id });
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
        }

        const user = await User.findOne({"email":req.body.email })

        console.log(user.id,user.username)

        if (!user) {
            return res.status(400).json({ message: 'Error. Wrong login or password' })
        }

        const token = jwt.sign({
            id: user.id,
            username: user.name
        }, bearer.SECRET, { expiresIn: '3 hours' })




        return res.json({token:token});
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getMe = async (req, res, next) => {


    bearer.checkTokenMiddleware(req,res,next)

    const token = req.headers.authorization && bearer.extractBearer(req.headers.authorization)
    // Décodage du token
    const decoded = jwt.decode(token, { complete: false })





    return res.json({ content: decoded })


}