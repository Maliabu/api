import model ,{ sequelize } from '../models'
import Bodabodas from './bodaboda';
const {
    Loan,
    Bodaboda,
    User
} = model;

class Statistics {
    static countRiders(req,res){
        Bodaboda.findAll()
        .then(bodabodas=>res.status(200).json({
            bodaboda_count: bodabodas.length
        }))
    }
    static countLoans(req,res){
        Loan.findAll()
        .then(loans=>res.status(200).json({
            loan_count: loans.length
        }))
    }

    static countAgents(req,res){
        User.findAll({
            where: {
                role: "agent"
            }
        })
        .then(agents=>res.status(200).json({
            agent_count: agents.length
        }))
    }

    static unpaid_trend(req, res) {
        return sequelize.query("SELECT Count(*) AS 'unpaid' , createdAt AS 'date' FROM Loans WHERE amount>0 GROUP BY createdAt", {
            type: sequelize.QueryTypes.SELECT
        }).then(results => {
            res.status(200).json({
                results: results
            })
        }).catch(error => {
            res.status(400).json(error)
        })
    }

    static paid_trend(req, res) {
        return sequelize.query("SELECT Count(*) AS 'paid' , createdAt AS 'date' FROM Loans WHERE amount<=0 GROUP BY createdAt", {
            type: sequelize.QueryTypes.SELECT
        }).then(results => {
            res.status(200).json({
                results: results
            })
        }).catch(error => {
            res.status(400).json(error)
        })
    }


}

export default Statistics;