const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv").config();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
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

connectDB();
app.get('/', (req, res) => {
   res.send("Welcome to SHOPLAKE");
});

app.use('/api/product', productRouter);
app.use("/images", express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})