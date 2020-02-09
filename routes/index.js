import Users from '../controllers/auth'

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


export default (app) => {
    app.get('/api/V1', (req, res) => res.status(200).send({
        message: 'Welcome to the 02KG bodaboda api',
    }));

    app.post('/api/v1/signup',upload.single("photo"),Users.signUp); // API route for user to signup
    app.post('/api/v1/login',Users.login); // API route for user to login


}
