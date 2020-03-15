import Users from '../controllers/auth'
import checkAuth from '../middleware/check-auth'
import Bodabodas from '../controllers/bodaboda'
import Loans from '../controllers/loan'
import Expenses from '../controllers/expenses'
import  Statistics from '../controllers/statistics'
import Savings from '../controllers/savings'
const { uuid } = require('uuidv4');
const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/images");
    },
    filename: (req, file, cb) => { // naming file
        cb(null, file.fieldname + "-" + uuid() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) { // check file type to be png, jpeg, or jpg
        cb(null, true);
    } else {
        cb(null, false); // else fails
    }

};

const upload = multer(
    {
        storage: fileStorage,
        limits:
        {
            fileSize: '50mb'
        },
        fileFilter: fileFilter
    }
).fields(
    [
        {
            name: 'stage_chairman_letter',
            maxCount: 1
        },
        {
            name: 'LC1_letter',
            maxCount: 1
        },
        {
            name: 'passport_photo',
            maxCount: 1
        },
        {
            name: 'application_form',
            maxCount: 1
        },
        {
            name: 'photo',
            maxCount: 1
        },
        {
            name: 'gurantor1_passport_photo',
            maxCount: 1
        },
        {
            name: 'gurantor2_passport_photo',
            maxCount: 1
        },
        {
            name: 'riding_permit',
            maxCount: 1
        },
        {
            name: 'address_proof',
            maxCount: 1
        },
        {
            name: 'gurantor1_stagecard',
            maxCount: 1
        },
        {
            name: 'gurantor2_stagecard',
            maxCount: 1
        }
    ]
)


export default (app) => {
    app.get('/api/V1', (req, res) => res.status(200).send({
        message: 'Welcome to the 02KG bodaboda api',
    }));
    app.post('/api/v1/signup', upload, Users.signUp); // API route for user to signup
    app.post('/api/v1/login', Users.login); // API route for user to login
    app.delete('/api/V1/users/:user_id', checkAuth, checkAuth, Users.deleteUser);// API route for deleting user
    app.put('/api/V1/users/:user_id', checkAuth, upload, Users.updateUser);// API route fro modifying user
    app.get('/api/V1/agents', checkAuth, Users.listAgents); // List of all agents,
    app.post('/api/V1/bodabodas', checkAuth, upload, Bodabodas.createBodaboda);
    app.get('/api/V1/bodabodas', checkAuth, upload, Bodabodas.listBodabodas);
    app.delete('/api/V1/bodabodas/:bodaboda_id', checkAuth, Bodabodas.deleteBodaboda);
    app.put('/api/V1/bodabodas/:bodaboda_id', checkAuth, upload, Bodabodas.updateBodaboda);
    app.post('/api/v1/loans',checkAuth,Loans.createLoan);
    app.get('/api/v1/loans',Loans.listLoans);
    app.delete('/api/v1/loans/:loanId',Loans.deleteLoan);
    app.put('/api/v1/loans/:loanId',Loans.updateloan);
    app.put('/api/v1/payloan/:loanId',Loans.payLoan);
    app.get('/api/v1/statistics/bodabodas_count',Statistics.countRiders);
    app.get('/api/v1/statistics/agents_count',Statistics.countAgents);
    app.get('/api/v1/statistics/loans_count',Statistics.countLoans);
    app.get('/api/v1/statistics/unpaid_trend',Statistics.unpaid_trend);
    app.get('/api/v1/statistics/paid_trend',Statistics.paid_trend);
    app.post('/api/v1/expenses',checkAuth,Expenses.createExpense);
    app.get('/api/v1/expenses',checkAuth,Expenses.listExpenses);
    app.delete('/api/v1/expenses/:expenseId',checkAuth,Expenses.deleteExpense);
    app.put('/api/v1/expenses/:expenseId',checkAuth,Expenses.updateExpense);
    app.post('/api/v1/savings',checkAuth,Savings.createSaving);
    app.get('/api/v1/savings',checkAuth,Savings.listSavings);
    app.delete('/api/v1/savings/:savingId',checkAuth,Savings.deleteSaving);
    app.put('/api/v1/savings/:savingId',checkAuth,Savings.updateSaving);
    
    


}
