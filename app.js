const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

const port = process.env.port || 8080;

app.use(bodyParser.json());
mongoose.connect(
    "mongodb+srv://amide:root@e-comm-app-db.p0hwj.mongodb.net/app-data?retryWrites=true&w=majority",
    (err) => {
        if(err) {
            console.log("connection lost")
        }else {
            console.log("Db Connected")
        }
    }
);



const authRoute = require('./router/auth-route');
const productRoute = require('./router/product-route');
const itemsRoute = require('./router/items-route');
const paymentRoute = require('./router/payment-route');

app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/item', itemsRoute);
app.use('/payment', paymentRoute);

app.get('/richa', (req, res) => {
    res.send("richa");
});
app.listen(port, () => {
    console.log("sever is ready at port" + port);
});
