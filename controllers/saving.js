import model from '../models'


const {
    Saving,
    User,
    Member
} = model;

class Savings {
    static createSaving(req, res) {
        const {
            memberId,
            amount
        } = req.body;

        const userId = req.userData.userId;
        Saving.create({
            userId,
            memberId,
            amount
        }).then(saving => res.status(200).json({
            saving: saving
        }))
            .catch(error => res.status(400).json({
                error: error
            }))
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
                    attributes: ['firstName', 'lastName']
                }
            ]
        })
            .then(savings => {
                const response = {

                    savings: savings.map(saving => {
                        return {
                            id: saving.id,
                            member: saving.Member.firstName + " " + saving.Member.lastName,
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
            amount
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