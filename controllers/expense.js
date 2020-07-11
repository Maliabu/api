import model from '../models'


const {
    Expense
} = model;


class Expenses {
    static createExpense(req, res) {
        const {
            title,
            amount,
            note
        } = req.body;

        Expense.create({
            title,
            amount,
            note
        }).then(expense => res.status(200).json({
            expense: expense
        }))
            .catch(error => res.status(400).json({
                error: error
            }))
    }

    static listExpense(req, res) {
        Expense.findAll()
            .then(expenses => {
                res.status(200).json({
                    expenses: expenses
                })
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

    static updateLoan(req, res) {
        const {
            title,
            amount,
            note
        } = req.body;

        return Expense.findByPk(req.params.expense_id)
            .then(expense => {
                if (!expense) {
                    return res.status(404).send({
                        message: 'Expense Not Found',
                    });
                } else {

                    expense
                        .update({
                            title: title || expense.title,
                            amount: amount || expense.amount,
                            note: note || expense.note,
                        })
                        .then((updateExpense) => res.status(200).send({
                            message: 'Expense successfully updated',
                            expense: {
                                title: title || updateExpense.title,
                                amount: amount || updateExpense.amount,
                                note: note || updateExpense.note,
                            }
                        }))
                        .catch(error => res.status(400).send(error));
                }

            })
    }

    static deleteExpense(req, res) {
        const { userData } = req;
        if (userData.role == "administrator") {
            return Expense.findByPk(req.params.expense_id)
                .then(expense => {
                    if (!expense) {
                        return res.status(404).send({
                            message: 'Expense Not Found',
                        });
                    } else {
                        expense
                            .destroy()
                            .then(() => {
                                res.status(200).json({
                                    message: "Expense deleted succesfully"
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

export default Expenses;