import Users from '../controllers/auth'
import CheckAuth from '../middleware/check-auth'
import Bodabodas from '../controllers/bodaboda'
const { uuid } = require('uuidv4');

const multer = require("multer");


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "LC1_letter" || file.fieldname === "stage_chairman_letter" || file.fieldname === "application_form") {
            // if uploading docs
            cb(null, "./uploads/documents");
        }
        else { // else uploading images
            cb(null, "./uploads/images");
        }
    },
    filename: (req, file, cb) => { // naming file
        cb(null, file.fieldname + "-" + uuid() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "LC1_letter" || file.fieldname === "stage_chairman_letter" || file.fieldname === "application_form") { // if uploading resume
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/docx' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) { // check file type to be pdf, doc, or docx
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    } else { // else uploading image
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
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
    app.delete('/api/V1/users/:user_id', CheckAuth, Users.deleteUser);// API route for deleting user
    app.put('/api/V1/users/:user_id', CheckAuth, upload, Users.updateUser);// API route fro modifying user
    app.get('/api/V1/agents', Users.listAgents); // List of all agents,
    app.post('/api/V1/bodabodas', upload, Bodabodas.createBodaboda);
    app.get('/api/V1/bodabodas', upload, Bodabodas.listBodabodas);
    app.delete('/api/V1/bodabodas/:bodaboda_id', CheckAuth, Bodabodas.deleteBodaboda);
    app.put('/api/V1/bodabodas/:bodaboda_id', upload, Bodabodas.updateBodaboda);


}
