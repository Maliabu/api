import model from '../models'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var fs = require('fs');


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
        } = req.body;
        console.log(req.body);
        const photo = req.files.photo[0].path;
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log(err)
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
        })

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
                            user: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                photo: 'http://127.0.0.1:3000/' + user.photo.slice(8)
                            },
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

    static deleteUser(req, res) {
        return User.findByPk(req.params.user_id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return fs.unlink(`${user.photo}`, function (err) {
                    if (err && err.code == 'ENOENT') {
                        // file doens't exist
                        console.info("Photo doesn't exist, won't remove it.");
                    } else if (err) {
                        // other errors, e.g. maybe we don't have enough permission
                        console.error("Error occurred while trying to remove file");
                    } else {
                        user
                            .destroy()
                            .then(() => res.status(200).send({
                                message: 'user successfully deleted'
                            }))
                            .catch(error => res.status(400).send(error));
                    }
                });

            }).catch(error => res.status(404).send(error))

    }
    static updateUser(req, res) {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            nin,
            role
        } = req.body
        var photo = '';
        if (req.files.photo) {
            photo = req.files.photo[0].path;
        }
        const password = '';
        if (req.body.password) {
            password = bcrypt.hashSync(req.body.password, 10);
        }


        return User.findByPk(req.params.user_id)
            .then(user => {
                if (photo != '') {
                    console.log(user.photo)
                    fs.unlink(user.photo, function (err) {
                        if (err && err.code == 'ENOENT') {
                            // file doens't exist
                            console.log(err)
                            console.info("Photo doesn't exist, won't remove it.");
                        } else if (err) {
                            // other errors, e.g. maybe we don't have enough permission
                            console.error("Error occurred while trying to remove file");
                        }
                    });

                }

                user
                    .update({
                        firstName: firstName || user.firstName,
                        lastName: lastName || user.lastName,
                        email: email || user.email,
                        password: password || user.password,
                        phoneNumber: phoneNumber || user.phoneNumber,
                        nin: nin || user.nin,
                        role: role || user.role,
                        photo: photo || user.photo


                    })
                    .then((updatedUser) => res.status(200).send({
                        message: 'user successfully updated',
                        user: {
                            firstName: firstName || updatedUser.firstNam,
                            lastName: lastName || updatedUser.lastName,
                            email: email || updatedUser.email,
                            password: password || updatedUser.password,
                            phoneNumber: phoneNumber || updatedUser.phoneNumber,
                            nin: nin || updatedUser.nin,
                            role: role || updatedUser.role,
                            photo: photo || updatedUser.photo

                        }
                    }))
                    .catch(error => res.status(400).send(error));

            }).catch(error => {
                res.status(400).json(error)
            })

    }
    static listAgents(req, res) {
        User.findAll({
            where: {
                role: "agent"
            }
        }).then(agents => {
            const response = {
                agents: agents.map(agent => {
                    return {
                        id: agent.id,
                        firstName: agent.firstName,
                        lastName: agent.lastName,
                        nin: agent.nin,
                        phoneNumber: agent.phoneNumber,
                        email: agent.email,
                        photo: 'http://127.0.0.1:3000/' + agent.photo.slice(8)
                    };
                })

            };
            res.status(200).json(response);
        })
    }

}

export default Users;