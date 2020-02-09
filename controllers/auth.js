import model from '../models'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const {
    User
} = model;

class Users {
    static signUp(req, res) {
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            nin,
            role
        } = req.body
        const photo = req.file.path;
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                return User
                    .create({
                        firstName,
                        lastName,
                        email,
                        password: hash,
                        nin,
                        photo,
                        phoneNumber,
                        role
                    })
                    .then(user => res.status(201).send({
                        success: true,
                        message: 'User successfully created',
                        user
                    })).catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })

                    });

            }
        });

    }

    static login(req, res) {
        const {
            email,
            password
        } = req.body
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: "Email or password is incorrect"
                    })
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user.id,
                            role: user.role
                        }, "secret")
                        return res.status(200).json({
                            message: "Auth successful",
                            user: user,
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: "Auth failed"
                    });
                });
            }).catch(err => {
                res.status(401).json({
                    message: "Auth failed"
                })
            })
    }

}

export default Users;