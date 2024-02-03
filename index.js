const express = require('express');
const { connect } = require('mongoose');
require('dotenv').config();
const upload = require('express-fileupload')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const app = express();
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(express.urlencoded({ extended:true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFound)
app.use(errorHandler)


connect(process.env.MONGO_URI).then(app.listen(process.env.PORT || 5000, () => console.log(`Server running in ${process.env.PORT}`)))
.catch(error => {console.log(error)})
