import model from '../models'


const {
    Transaction,
    Member
} = model;


class Transactions {

    static createTransaction(req, res) {
        const {
            memberId,
            amount,
            type
        } = req.body;

        Transaction.create({
            memberId,
            amount,
            type
        }).then(transaction => {
            res.status(200).json({
                message: "Transaction Created Successfully",
                transaction: transaction
            })
        }).catch(err => {
            res.status(404).json({
                message: "An error occured",
                err: err
            })
        });
    }

    static listTransactions(req, res) {
        Transaction.findAll({
            include: [
                {
                    model: Member,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        })
            .then(transactions => {
                const response = {

                    transactions: transactions.map(transaction => {
                        return {
                            id: transaction.id,
                            memberId: transaction.Member.id,
                            member: transaction.Member.firstName + " " + transaction.Member.lastName,
                            amount: transaction.amount,
                            type: transaction.type,
                            date_issued: transaction.createdAt
                        };
                    })
                };

                res.status(200).json(response)
            }).catch(error => res.status(400).json({
                error: error
            }))
    }




}

export default Transactions;