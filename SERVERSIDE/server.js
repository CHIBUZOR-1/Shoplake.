const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv").config();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const crypto = require('crypto');
const { connectDB } = require('./db');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/authRoute');
const cartRouter = require('./routes/CartRoute');
const orderRouter = require('./routes/OrderRoute');


const PORT = process.env.LOCALHOST;
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json({ urlencoded: false, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64'); // Generate nonce
    next();
});


app.use((req, res, next) => {
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`, "https://www.gstatic.com", "https://www.googleapis.com", "https://apis.google.com"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                imgSrc: ["'self'", "data:", "https://www.gstatic.com", "blob:", "https://as2.ftcdn.net", "https://res.cloudinary.com", "https://cdn.jsdelivr.net"],
                connectSrc: ["'self'", "https://www.googleapis.com", "https://firebasestorage.googleapis.com", "https://identitytoolkit.googleapis.com", "blob:", "https://res.cloudinary.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'", "blob:", "https://res.cloudinary.com"],
                frameSrc: ["'self'", "https://accounts.google.com"],
                baseUri: ["'self'"],
                formAction: ["'self'"],
            }
        }
    })(req, res, next);
});

connectDB();


app.use('/api/product', productRouter);
app.use("/images", express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.use(express.static(path.join(__dirname, '../clientside/build')));

app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, '../clientside/build', 'index.html'))
})

app.get('/', (req, res) => {
    res.send("Welcome to SHOPLAKE");
 });

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})