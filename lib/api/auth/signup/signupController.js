import User from '../userModel';
import _ from 'lodash';
import {signToken} from '../auth';



exports.param = async (req, res, next, id) => {
    try{
        let cusfindby = await User.find({'username': id});
        if(_.isEmpty(cusfindby)){
            cusfindby = await User.find({'email': id});
            if(_.isEmpty(cusfindby)){
                cusfindby = await User.find({'id_num': id});
                req.credentialExistsOnServer = _.isEmpty(cusfindby)? false: true;
            }else{
                req.credentialExistsOnServer = true;
            }
        }else{
            req.credentialExistsOnServer = true;
        }
        next();
    }catch(err){
        next(err);
    }
}

exports.getOne = (req, res) => {
    const resource = req.credentialExistsOnServer;
    res.json({
        status: 200,
        resourceExists: resource
    });
}

exports.post = (req, res, next) => {
    const newUser = req.body;
    User.create(newUser)
        .then((user) => {
            const response = {
                login_token: signToken(user._d),
                username: user.username,
                email: user.email,
                name: user.name,
                id_num: user.id_num,
            }
            res.json(response);
        }, (err) =>{
            next(err);
        })
}