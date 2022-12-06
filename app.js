const express= require('express');
const app=express();
var cors=require('cors');

const UserRoute=require('./Route/User');
const ExpenseRoute=require('./Route/expense');

const User=require('./model/user');
const Expense=require('./model/expense');

const sequelize=require('./util/database');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', UserRoute);
app.use('/expense', ExpenseRoute);

Expense.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Expense);

 
sequelize
.sync()
.then(result=>{
    app.listen(8000); 
} )
.catch(err=> console.log(err))



// npm init
// npm install nodemon
// npm install express
// ab express require kar lo
// make route

// install sequelize , mysql2
// make util => database, make any model, 
// app.js pe pehli table k liye.