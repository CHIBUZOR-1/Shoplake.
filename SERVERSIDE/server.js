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
                scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`, "'sha256-b57f26007a21e9e39bdc576d14eb693481b75edbfa74f3cf28df32abd018e40c'", "https://www.gstatic.com", "https://www.googleapis.com", "https://apis.google.com", "*.tawk.to"],
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
    const nonce = res.locals.nonce; // Get nonce for CSP

    // Path to React's built `index.html`
    const indexHtmlPath = path.resolve(__dirname, '../clientside/build', 'index.html');

    // Read and modify the HTML dynamically
    fs.readFile(indexHtmlPath, 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(500).send('Internal server error');
        }

        // Inject nonce into CSP meta tag and Tawk.to `<script>` tag
        const updatedHtml = html
            .replace(
                '<head>',
                `<head><meta http-equiv="Content-Security-Policy" content="script-src 'self' 'nonce-${nonce}' 'sha256-AbC123xYz456kLm...' https://www.gstatic.com https://apis.google.com *.tawk.to;">`
            )
            .replace(
                '<script type="text/javascript">',
                `<script nonce="${nonce}" type="text/javascript">`
            );

        res.send(updatedHtml); // Serve updated HTML
    });
})

app.get('/', (req, res) => {
    res.send("Welcome to SHOPLAKE");
 });

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})