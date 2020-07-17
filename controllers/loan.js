import model from '../models'
const sendSms = require('./sms');


const {
    Loan,
    User,
    Member
} = model;

class Loans {
    static payLoan(req, res) {
        const {
            memberId,
            amount,
            phoneNumber
        } = req.body;

        return Loan.findOne({
            where: {
                memberId: memberId
            }
        }).then(loan => {
            if (loan) {

                return loan.update({
                    memberId: loan.memberId,
                    userId: loan.userId,
                    amount_remaining: parseInt(loan.amount_remaining) - parseInt(amount)
                }).then(loan => {
                    const welcomeMessage = 'You have paid UGX ' + amount + ' off your 2GO Financial Services Loan. Your Loan Balance is UGX ' + loan.amount_remaining;
                    const phone = "+256" + phoneNumber.slice(1);
                    console.log("Details", { phone, welcomeMessage })
                    sendSms(phone, welcomeMessage);
                    res.status(200).send({
                        message: 'Loan amount paid successfully',
                    })
                })
                    .catch(error => { 
                        console.log(error)
                        res.status(400).send(error)
                     });

            } else {
                console.log("User doesn't exist")
            }


        }).catch(err => {
            console.log(err);
            res.status(404).json(err);
        })

    }

    static createLoan(req, res) {
        const {
            memberId,
            amount,
            interest,
            payment_period,
            phoneNumber

        } = req.body;
        const userId = req.userData.userId;
        return Loan.findOne({
            where: {
                memberId: memberId
            }
        }).then(loan => {
            if (loan) {
                return loan.update({
                    memberId: loan.memberId,
                    userId: loan.userId,
                    payment_period: loan.payment_period,
                    amount_borrowed: parseInt(amount) + parseInt(interest / 100 * amount),
                    amount_remaining: parseInt(amount) + parseInt(interest / 100 * amount),
                }).then(loan => {
                    const welcomeMessage = 'You have been given a 2G0 Finacial Services Loan of UGX ' + amount;
                    const phone = "+256" + phoneNumber.slice(1);
                    console.log("Details", { phone, welcomeMessage })
                    sendSms(phone, welcomeMessage);
                    res.status(200).send({
                        message: 'Loan amount issued successfully',
                    })
                })
                    .catch(error => res.status(400).send(error));

            }
            return Loan.create({
                userId,
                memberId,
                amount_borrowed: parseInt(amount) + parseInt(interest / 100 * amount),
                amount_remaining: parseInt(amount) + parseInt(interest / 100 * amount),
                interest,
                payment_period,
            }).then(loan => {
                const welcomeMessage = 'You have been given a 2G0 Financial Services Loan of UGX ' + amount;
                const phone = "+256" + phoneNumber.slice(1);
                console.log("Details", { phone, welcomeMessage })
                sendSms(phone, welcomeMessage);
                res.status(200).json({
                    message: "Loan created successfully",
                    loan: loan
                })
            })
                .catch(error => res.status(400).json({
                    error: error
                }))


        }).catch(err => {
            console.log(err);
            res.status(404).json(err);
        })

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
                    attributes: ['id', 'firstName', 'lastName','phoneNumber']
                }
            ]
        })
            .then(loans => {
                const response = {

                    loans: loans.map(loan => {
                        return {
                            id: loan.id,
                            member: loan.Member.firstName + " " + loan.Member.lastName,
                            amount_borrowed: loan.amount_borrowed,
                            amount_remaining: loan.amount_remaining,
                            interest: loan.interest,
                            issued_by: loan.User.firstName + " " + loan.User.lastName,
                            memberId: loan.Member.id,
                            phoneNumber: loan.Member.phoneNumber,
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
            payment_period,
            interest,
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
                            interest: interest || loan.interest,
                            payment_period: payment_period || loan.payment_period
                        })
                        .then((updateLoan) => res.status(200).send({
                            message: 'Loan successfully updated',
                            loan: {
                                memberId: memberId || updateLoan.memberId,
                                amount: amount || updateLoan.amount,
                                interest: interest || updateLoan.interest,
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