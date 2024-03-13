const express = require('express');
app = express();
const session = require('express-session');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();
const connection = require('./routes/configs/database');
const PORT = process.env.PORT;

const formRoute = require('./routes/form')


connection.connect ((err) => {
    if(err){
        console.log('Não foi possível conectar ao banco de dados.', err)
    } else{
        console.log('Conectado com o id ', connection.threadId)
    }
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs')

app.use('', formRoute)

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:'+PORT)
})