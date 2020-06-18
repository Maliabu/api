import model from '../models'
var fs = require('fs')

const {
    Member,
    User
} = model;


class Members {

    static createMember(req, res) {
        const {
            firstName,
            lastName,
            nin,
            phoneNumber,
        } = req.body;

        const userId = req.userData.userId;
        const passport_photo = req.files.passport_photo[0].path;

        Member.create({
            userId,
            firstName,
            lastName,
            nin,
            phoneNumber,
            passport_photo
        }).then(member => res.status(200).json({
            member: member
        }))
            .catch(error => res.status(400).json({
                error: error
            }))
    }

    static listMembers(req, res) {
        Member.findAll({
            include: [{
                model: User,
                attributes: ['firstName', 'lastName']
            }],
            attributes: ['id', 'firstName', 'lastName', 'nin', 'phoneNumber', 'passport_photo'],
        })
            .then(members => {
                const response = {
                    members: members.map(member => {
                        return {
                            id: member.id,
                            name: member.firstName + " " + member.lastName,
                            firstName:member.firstName,
                            lastName:  member.lastName,
                            phoneNumber: member.phoneNumber,
                            nin: member.nin,
                            photo: member.passport_photo.slice(7),
                            registered_by: member.User.firstName + " " + member.User.lastName,
                        };
                    })
                };


                res.status(200).json(response)
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

    static deleteMember(req, res) {
        const { userData } = req;
        if (userData.role == "administrator") {
            return Member.findByPk(req.params.member_id)
                .then(member => {
                    if (!member) {
                        return res.status(404).send({
                            message: 'User Not Found',
                        });
                    } else {
                        member
                            .destroy()
                            .then(() => {
                                var files = [member["passport_photo"]];
                                console.log(files)
                                var i = files.length;
                                files.forEach(filepath => {
                                    fs.unlink(filepath, function (err) {
                                        i--;
                                        if (err) {
                                            console.log(err)
                                            return;
                                        } else if (i <= 0) {
                                            console.log("All files have been removed")
                                        }
                                    });
                                });

                                res.status(200).json({
                                    message: "Member deleted succesfully"
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                res.status(400).json({
                                    error: error
                                })
                            });
                    }

                }).catch(error => {
                    console.log(error)
                    res.status(400).json({
                        error: error
                    })
                })

        } else {
            res.status(400).json({
                error: "Your access level doesnt permit you to carryout this action"
            })
        }

    }
    static updateMember(req, res) {
        const {
            firstName,
            lastName,
            date_of_birth,
            nin,
            phoneNumber,
        } = req.body;

        var passport_photo = '';

        if (req.files.passport_photo) {
            passport_photo = req.files.passport_photo[0].path;
        }

        return Member.findByPk(req.params.member_id)
            .then(member => {
                if (!member) {
                    return res.status(404).send({
                        message: 'Member Not Found',
                    });
                } else {
                    var files = [];

                    if (passport_photo != '') {
                        files.push(member["passport_photo"])
                    }
                    console.log(files)
                    var i = files.length;
                    files.forEach(filepath => {
                        fs.unlink(filepath, function (err) {
                            i--;
                            if (err) {
                                console.log(err)
                                return;
                            } else if (i <= 0) {
                                console.log("All files have been removed")
                            }
                        });
                    });

                    member
                        .update({
                            firstName: firstName || member.firstName,
                            lastName: lastName || member.lastName,
                            phoneNumber: phoneNumber || member.phoneNumber,
                            date_of_birth: date_of_birth || member.date_of_birth,
                            phoneNumber: phoneNumber || member.phoneNumber,
                            nin: nin || member.nin,
                            passport_photo: passport_photo || member.passport_photo,
                        })
                        .then((updateMember) => res.status(200).send({
                            message: 'Member successfully updated',
                            member: {
                                firstName: firstName || updateMember.firstName,
                                lastName: lastName || updateMember.lastName,
                                phoneNumber: phoneNumber || updateMember.phoneNumber,
                                date_of_birth: date_of_birth || updateMember.date_of_birth,
                                phoneNumber: phoneNumber || updateMember.phoneNumber,
                                nin: nin || updateMember.nin,
                                passport_photo: passport_photo || updateMember.passport_photo,
                            }
                        }))
                        .catch(error => res.status(400).send(error));
                }

            })
    }

}


export default Members;