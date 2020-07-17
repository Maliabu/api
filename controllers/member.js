import model from '../models'
var fs = require('fs')
const sendSms = require('./sms');
const {
    Member,
    User
} = model;


class Members {

    static memberLogin(req, res){
        const {
            phoneNumber,
            pin
        } = req.body

        Member.findOne({
            where:{
                phoneNumber: phoneNumber,
                pin: pin
            }
        }).then(member =>{
            if(member){
               return res.status(200).json({
                    message: "Member sucessfully logged In",
                    member: member
                })

            }else{
                return res.status(404).json({
                    error: "Phone number or pin is incorrect"
                })
            }
            
        }).catch(error=>{
            res.status(400).json({
                error: error
            })
        })

    }

    static createMember(req, res) {
        const {
            firstName,
            lastName,
            nin,
            phoneNumber,
        } = req.body;

        const userId = req.userData.userId;
        const passport_photo = req.files.passport_photo[0].path;

        var chars = "0123456789";
        var string_length = 5;
        var pin = "";
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            pin += chars.substring(rnum, rnum + 1);
        }

        Member.create({
            userId,
            firstName,
            lastName,
            nin,
            phoneNumber,
            passport_photo,
            pin
        }).then(member => {
            const welcomeMessage = 'Hey '+firstName+' '+lastName+' Welcome to 2GO Financial Services. Your PIN is ' + member.pin+' and phone number'+phoneNumber;
            const phone = "+256"+member.phoneNumber.slice(1);
            console.log("Details",{phone,welcomeMessage})
            sendSms(phone, welcomeMessage);
            res.status(200).json({
                member: member
            })
        })
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
            attributes: ['id', 'firstName', 'lastName', 'nin', 'pin', 'phoneNumber', 'passport_photo'],
        })
            .then(members => {
                const response = {
                    members: members.map(member => {
                        return {
                            id: member.id,
                            name: member.firstName + " " + member.lastName,
                            firstName: member.firstName,
                            lastName: member.lastName,
                            phoneNumber: member.phoneNumber,
                            nin: member.nin,
                            pin: member.pin,
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
            pin
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
                            pin: pin || member.pin,
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
                                pin: pin || updateMember.pin,
                                passport_photo: passport_photo || updateMember.passport_photo,
                            }
                        }))
                        .catch(error => res.status(400).send(error));
                }

            })
    }

}


export default Members;