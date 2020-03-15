import model from '../models'
const {
    Expense
} = model;

class Expenses {
    static createExpense(req, res) {
        const {
            type,
            amount
        } = req.body;
        Expense.create({
            type,
            amount
        }).then(Expense => res.status(200).json({
            Expense: Expense
        })).catch(error => res.status(400).json({
            error: error
        }))
    }
    static listExpenses(req, res) {
        Expense.findAll().then(expenses => {
            res.status(200).json(expenses)

        }).catch(error => res.status(400).json({
            error: error
        }))
    }
    static updateExpense(req, res) {
        const {
            type,
            amount
        } = req.body;
        return Expense.findByPk(req.params.expenseId)
            .then(Expense => {
                Expense.update({
                    type: type || Expense.type,
                    amount: amount || Expense.amount
                }).then(updatedExpense => {
                    res.status(200).json({
                        message: "Expense updated successfully",
                        Expense: {
                            type: type || updatedExpense.type,
                            amount: amount || updatedExpense.amount
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


    static deleteExpense(req, res) {
        return Expense.findByPk(req.params.expenseId)
            .then(Expense => {
                Expense
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Expense successfully deleted'
                    }))
                    .catch(error => res.status(400).send(error));
            }).catch(error => res.status(400).json({
                error: error
            }))
    }

}

export default Expenses;