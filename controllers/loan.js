import model from '../models'


const {
    Loan,
    User,
    Member
} = model;

class Loans {
    static createLoan(req, res) {
        const {
            memberId,
            amount,
            payment_period
        } = req.body;

        const userId = req.userData.userId;

        Loan.create({
            userId,
            memberId,
            amount,
            payment_period
        }).then(loan => res.status(200).json({
            loan: loan
        }))
            .catch(error => res.status(400).json({
                error: error
            }))
    }

    static listLoan(req, res) {
        Loan.findAll({
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
            .then(loans => {
                const response = {

                    loans: loans.map(loan => {
                        return {
                            id: loan.id,
                            member: loan.Member.firstName + " " + loan.Member.lastName,
                            amount: loan.amount,
                            issued_by: loan.User.firstName + " " + loan.User.lastName,
                            payment_period: loan.payment_period,
                            date_issued: loan.createdAt
                        };
                    })
                };

                res.status(200).json(response)
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

    static updateLoan(req, res) {
        const {
            memberId,
            amount,
            payment_period
        } = req.body;

        return Loan.findByPk(req.params.loan_id)
            .then(loan => {
                if (!loan) {
                    return res.status(404).send({
                        message: 'Loan Not Found',
                    });
                } else {

                    loan
                        .update({
                            memberId: memberId || loan.memberId,
                            amount: amount || loan.amount,
                            payment_period: payment_period || loan.payment_period
                        })
                        .then((updateLoan) => res.status(200).send({
                            message: 'Loan successfully updated',
                            loan: {
                                memberId: memberId || updateLoan.memberId,
                                amount: amount || updateLoan.amount,
                                payment_period: payment_period || updateLoan.payment_period
                            }
                        }))
                        .catch(error => res.status(400).send(error));
                }

            })
    }

    static deleteLoan(req, res) {
        const { userData } = req;
        if (userData.role == "administrator") {
            return Loan.findByPk(req.params.loan_id)
                .then(loan => {
                    if (!loan) {
                        return res.status(404).send({
                            message: 'Loan Not Found',
                        });
                    } else {
                        loan
                            .destroy()
                            .then(() => {
                                res.status(200).json({
                                    message: "Loan deleted succesfully"
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


export default Loans;