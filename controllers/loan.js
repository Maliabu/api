import model from '../models'
const {
    Loan,
    Bodaboda,
    User
} = model;

class Loans {
    static createLoan(req, res) {
        const {
            userData,
            bodabodaId,
            stage_name,
            return_date,
            amount
        } = req.body;
        let userId = userData.userId;
        Loan.create({
            userId,
            bodabodaId,
            stage_name,
            return_date,
            amount
        }).then(loan => res.status(200).json({
            loan: loan
        })).catch(error => res.status(400).json({
            error: error
        }))
    }
    static listLoans(req, res) {
        Loan.findAll({
            attributes: ['id', 'stage_name', 'return_date', 'amount', 'createdAt'],
            include: [
                {
                    model: Bodaboda,
                    attributes: ['firstName', 'lastName', 'passport_photo', 'phoneNumber'],
                },
                {
                    model: User,
                    attributes: ['firstName', 'lastName', 'photo', 'phoneNumber'],
                }
            ]

        }).then(loans => {
            const response = {
                loans: loans.map(loan => {
                    return {
                        id: loan.id,
                        rider_name: loan.Bodaboda.firstName + " " + loan.Bodaboda.lastName,
                        rider_phone: loan.Bodaboda.phoneNumber,
                        agent_name: loan.User.firstName + " " + loan.User.lastName,
                        agent_phone: loan.User.phoneNumber,
                        stage_name: loan.stage_name,
                        amount: loan.amount,
                        return_date: loan.return_date,
                        date_issued: loan.createdAt,
                        agent_photo: 'http://127.0.0.1:3000/' + loan.User.photo.slice(8),
                        rider_photo: 'http://127.0.0.1:3000/' + loan.Bodaboda.passport_photo.slice(8)
                    };

                })

            };
            res.status(200).json(response);
        }).catch(error => res.status(400).json({
            error: error
        }))
    }
    static updateloan(req, res) {
        const {
            userId,
            bodabodaId,
            stage_name,
            return_date,
            amount
        } = req.body;
        return Loan.findByPk(req.params.loanId)
            .then(loan => {
                loan.update({
                    userId: userId || loan.firstName,
                    bodabodaId: bodabodaId || loan.bodabodaId,
                    stage_name: stage_name || loan.email,
                    return_date: return_date || loan.return_date,
                    amount: amount || loan.amount
                }).then(updatedLoan => {
                    res.status(200).json({
                        message: "loan updated successfully",
                        loan: {
                            userId: userId || updatedLoan.firstName,
                            bodabodaId: bodabodaId || updatedLoan.bodabodaId,
                            stage_name: stage_name || updatedLoan.email,
                            return_date: return_date || updatedLoan.return_date,
                            amount: amount || updatedLoan.amount
                        }
                    })

                }).catch(error => {
                    res.status(400).json({
                        error: error
                    });
                });

            }).catch(error => {
                res.status(404).json({
                    error: error
                });
            });

    }

    static payLoan(req, res) {
        const { amount } = req.body;
        return Loan.findByPk(req.params.loanId)
            .then(loan => {
                loan.update({
                    amount: loan.amount - amount
                }).then(() => res.status(200).json({
                    message: "Loan amount of " + amount + " has been paid"
                })).catch(error => res.status(400).json({
                    error: error
                }));
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

    static deleteLoan(req, res) {
        return Loan.findByPk(req.params.loanId)
            .then(loan => {
                if (!loan) {
                    return res.status(404).send({
                        message: 'Loan Not Found',
                    });
                } else {
                    if(loan.amount<=0){
                        loan
                        .destroy()
                        .then(() => res.status(200).send({
                            message: 'Loan successfully deleted'
                        }))
                        .catch(error => res.status(400).send(error));

                    }else{
                        return res.status(400).send({
                            message: 'Loan Cant be deleted because its unpaid',
                        });

                    }
                   
                }
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

}

export default Loans;