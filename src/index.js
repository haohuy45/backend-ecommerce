const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const app = express();
const path = require('path')
const cors = require('cors')


//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')

//environment
env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ryjt0.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
).then(()=>{
    console.log('Database connected')
});

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.use(cors())
app.use('/api', authRoutes)
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})