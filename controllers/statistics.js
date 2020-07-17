import model, { sequelize } from '../models';

const {
    User,
    Member,
    Saving,
    Loan
} = model;

class Statistics {

    static employees_count(req, res) {
        User.findAll()
            .then(employees => {
                res.status(200).json({
                    employees_count: employees.length
                })
            }).catch(err => {
                res.status(400).json({
                    error: err
                })
            })
    }

    static members_count(req, res) {
        Member.findAll()
            .then(members => {
                res.status(200).json({
                    members_count: members.length
                })
            }).catch(err => {
                res.status(400).json({
                    error: err
                })
            })
    }

    static savings_count(req, res) {
        Saving.findAll()
            .then(savings => {
                res.status(200).json({
                    savings_count: savings.length
                })
            }).catch(err => {
                res.status(400).json({
                    error: err
                })
            })
    }

    static loans_count(req, res) {
        Loan.findAll()
            .then(loans => {
                res.status(200).json({
                    loans_count: loans.length
                })
            }).catch(err => {
                res.status(400).json({
                    error: err
                })
            })
    }

    static savings_trend(req,res) {
        return sequelize.query("SELECT ANY_VALUE(Savings.createdAt) AS 'Date',COUNT(Savings.id) AS 'Count' from Savings GROUP BY DAY(Savings.createdAt)",{
            type: sequelize.QueryTypes.SELECT
        }).then(savings_trend => {
            res.status(200).json({
                savings_trend: savings_trend
            })
        }).catch(error=>{
            res.status(400).json(error)
        })
    }

    static user_total_savings(req,res) {
        return sequelize.query("SELECT SUM(Savings.amount) AS 'total_savings' from Savings WHERE Savings.memberId = '"+req.params.memberId+"'",{
            type: sequelize.QueryTypes.SELECT
        }).then(user_savings => {
            res.status(200).json({
                user_savings: user_savings
            })
        }).catch(error=>{
            res.status(400).json(error)
        })
    }

    static user_total_loan(req,res) {
        return sequelize.query("SELECT SUM(Loans.amount) AS 'total_loan' from Loans WHERE Loans.memberId = '"+req.params.memberId+"'",{
            type: sequelize.QueryTypes.SELECT
        }).then(loans_amount => {
            res.status(200).json({
                loans_amount: loans_amount
            })
        }).catch(error=>{
            res.status(400).json(error)
        })
    }





}


export default Statistics;