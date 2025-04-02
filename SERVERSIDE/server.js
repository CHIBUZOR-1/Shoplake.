const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");
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

dotenv.config();


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
                scriptSrc: ["'self'", "'unsafe-inline'", "https://www.gstatic.com", "https://www.googleapis.com", "https://apis.google.com", "*.tawk.to"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "*.tawk.to"],
                imgSrc: ["'self'", "data:", "https://www.gstatic.com", "blob:", "https://as2.ftcdn.net", "https://res.cloudinary.com", "https://cdn.jsdelivr.net", "*.tawk.to"],
                connectSrc: ["'self'", "https://www.googleapis.com", "https://firebasestorage.googleapis.com", "https://identitytoolkit.googleapis.com", "blob:", "https://res.cloudinary.com", "*.tawk.to"],
                fontSrc: ["'self'", "https://fonts.gstatic.com", "*.tawk.to"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'", "blob:", "https://res.cloudinary.com", "*.tawk.to"],
                frameSrc: ["'self'", "https://accounts.google.com"],
                baseUri: ["'self'"],
                formAction: ["'self'"],
            }
        }
    })(req, res, next);
});

const PORT = process.env.LOCALHOST || 5500;

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

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})