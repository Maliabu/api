import Users from '../controllers/auth'
import CheckAuth from '../middleware/check-auth'
import Members from '../controllers/member'
import Savings from '../controllers/saving'
import Loans from '../controllers/loan'
import Expenses from '../controllers/expense'
import Statistics from '../controllers/statistics'
import Transactions from '../controllers/transaction'



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
            name: 'passport_photo',
            maxCount: 1
        },
        {
            name: 'photo',
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
    app.delete('/api/V1/users/:user_id', CheckAuth, Users.deleteUser);// API route for deleting user
    app.put('/api/V1/users/:user_id', CheckAuth, upload, Users.updateUser);// API route fro modifying user
    app.get('/api/V1/agents', Users.listAgents); // List of all agents,
    app.post('/api/V1/members', CheckAuth, upload, Members.createMember);
    app.post('/api/V1/member_login', Members.memberLogin);
    app.get('/api/V1/members', Members.listMembers);
    app.delete('/api/V1/members/:member_id', CheckAuth, Members.deleteMember);
    app.put('/api/V1/members/:member_id', upload, Members.updateMember);
    app.post('/api/V1/savings', CheckAuth, Savings.createSaving);
    app.post('/api/V1/debitSaving', CheckAuth, Savings.debitSaving);
    app.get('/api/V1/savings', CheckAuth, Savings.listSaving);
    app.put('/api/V1/savings/:saving_id', CheckAuth, Savings.updateSaving);
    app.delete('/api/V1/savings/:saving_id', CheckAuth, Savings.deleteSaving);
    app.post('/api/V1/loans', CheckAuth, Loans.createLoan);
    app.post('/api/V1/payLoan', CheckAuth, Loans.payLoan);
    app.get('/api/V1/loans', CheckAuth, Loans.listLoan);
    app.put('/api/V1/loans/:loan_id', CheckAuth, Loans.updateLoan);
    app.delete('/api/V1/loans/:loan_id', CheckAuth, Loans.deleteLoan);
    app.post('/api/V1/expenses', CheckAuth, Expenses.createExpense);
    app.get('/api/V1/expenses', CheckAuth, Expenses.listExpense);
    app.put('/api/V1/expenses/:expense_id', CheckAuth, Expenses.updateLoan);
    app.delete('/api/V1/expenses/:expense_id', CheckAuth, Expenses.deleteExpense);
    app.get('/api/V1/employees_count', CheckAuth, Statistics.employees_count);
    app.get('/api/V1/savings_count', CheckAuth, Statistics.savings_count);
    app.get('/api/V1/members_count', CheckAuth, Statistics.members_count);
    app.get('/api/V1/loans_count', CheckAuth, Statistics.loans_count);
    app.get('/api/V1/savings_trend', CheckAuth, Statistics.savings_trend);
    app.post('/api/V1/transactions',Transactions.createTransaction);
    app.get('/api/V1/transactions',Transactions.listTransactions);

}
