import model from '../models'
const sendSms = require('./sms');


const {
    Saving,
    User,
    Member
} = model;

class Savings {
    static debitSaving(req, res) {
        const {
            memberId,
            amount,
            phoneNumber
        } = req.body;

        const userId = req.userData.userId;
        return Saving.findOne({
            where: {
                memberId: memberId
            }
        }).then(saving => {
            if (saving) {

                return saving.update({
                    memberId: saving.memberId,
                    userId: saving.userId,
                    amount: parseInt(saving.amount) - parseInt(amount)
                }).then(() => {
                    const welcomeMessage = 'Your 2G0 Financial Services Account has been debited with UGX ' + amount + '. Your Account Balance is UGX ' + saving.amount;
                    const phone = "+256" + phoneNumber.slice(1);
                    console.log("Details", { phone, welcomeMessage })
                    sendSms(phone, welcomeMessage);

                    res.status(200).send({
                        message: 'Account Debited successfully',
                    })
                })
                    .catch(error => res.status(400).send(error));

            }
            return Saving.create({
                userId,
                memberId,
                amount
            }).then(saving => res.status(200).json({
                saving: saving
            }))
                .catch(error => res.status(400).json({
                    error: error
                }))


        }).catch(err => {
            console.log(err);
            res.status(404).json(err);
        })

    }

    static createSaving(req, res) {
        const {
            memberId,
            amount,
            account_type,
            phoneNumber
        } = req.body;
        const userId = req.userData.userId;
        return Saving.findOne({
            where: {
                memberId: memberId
            }
        }).then(saving => {
            if (saving) {

                return saving.update({
                    memberId: saving.memberId,
                    userId: saving.userId,
                    amount: parseInt(amount) + parseInt(saving.amount)
                }).then(() => {
                    const welcomeMessage = 'Your 2G0 Financial Services Account has been credited with UGX ' + amount + '. Your Account Balance is UGX ' + saving.amount;
                    const phone = "+256" + phoneNumber.slice(1);
                    console.log("Details", { phone, welcomeMessage })
                    sendSms(phone, welcomeMessage);
                    res.status(200).send({
                        message: 'Account Credited successfully',
                    })
                })
                    .catch(error => res.status(400).send(error));

            }
            return Saving.create({
                userId,
                memberId,
                account_type,
                amount,
                phoneNumber
            }).then(saving => {
                const welcomeMessage = 'Your 2G0 Financial Services Account has been created with an initial deposit of  UGX ' + amount + '. Your Account Balance is UGX ' + saving.amount;
                const phone = "+256" + phoneNumber.slice(1);
                console.log("Details", { phone, welcomeMessage })
                sendSms(phone, welcomeMessage);
                res.status(200).json({
                    saving: saving
                })
            })
                .catch(error => {
                    console.log(error)
                    res.status(400).json({
                        error: error
                    })
                })


        }).catch(err => {
            console.log(err);
            res.status(404).json(err);
        })


    }

    static listSaving(req, res) {
        Saving.findAll({
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Member,
                    attributes: ['id', 'firstName', 'lastName','phoneNumber']
                }
            ]
        })
            .then(savings => {
                const response = {

                    savings: savings.map(saving => {
                        return {
                            id: saving.id,
                            member: saving.Member.firstName + " " + saving.Member.lastName,
                            memberId: saving.Member.id,
                            phoneNumber: saving.Member.phoneNumber,
                            account_type: saving.account_type,
                            amount: saving.amount,
                            issued_by: saving.User.firstName + " " + saving.User.lastName,
                            date_issued: saving.createdAt
                        };
                    })
                };

                res.status(200).json(response)
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

    static updateSaving(req, res) {
        const {
            memberId,
            amount,
            account_type
        } = req.body;

        return Saving.findByPk(req.params.saving_id)
            .then(saving => {
                if (!saving) {
                    return res.status(404).send({
                        message: 'Saving Not Found',
                    });
                } else {

                    saving
                        .update({
                            memberId: memberId || saving.memberId,
                            account_type: account_type || saving.account_type,
                            amount: amount || saving.amount,
                        })
                        .then((updateSaving) => res.status(200).send({
                            message: 'Expense successfully updated',
                            saving: {
                                memberId: memberId || updateSaving.memberId,
                                amount: amount || updateSaving.amount,
                            }
                        }))
                        .catch(error => res.status(400).send(error));
                }

            })
    }

    static deleteSaving(req, res) {
        const { userData } = req;
        if (userData.role == "administrator") {
            return Saving.findByPk(req.params.saving_id)
                .then(saving => {
                    if (!saving) {
                        return res.status(404).send({
                            message: 'Loan Not Found',
                        });
                    } else {
                        saving
                            .destroy()
                            .then(() => {
                                res.status(200).json({
                                    message: "Saving deleted succesfully"
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




}

export default Savings;