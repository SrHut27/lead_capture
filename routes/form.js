const express = require('express');
const router = express.Router();
const connection = require('./configs/database');

connection.connect ((err) =>{
    if(err){
        console.log('Não foi possível conectar ao banco de dados:', err)
    } else{
        console.log('Conectado ao bancod de dados com o id', connection.threadId)
    }
})

router.get('', (req, res) =>{
    connection.query('SELECT * from lead_cap', (err, results)=>{
        if(err){
            console.log('Erro ao tentar conectar com o banco de dados, por favor, tente masi tarde', err);
            return res.redirect('/');
        } else {
            res.render('form', { leads: results});
        }
    });
});

router.get('/lead/add', (req, res) =>{
    return res.redirect('/');
});

router.post('/lead/add', async (req, res) => {
    const {name, email, number, comment } = req.body;
    console.log(name, email, number, comment); // Verifique se os valores estão sendo recebidos corretamente

    connection.query('INSERT INTO lead_cap (name, email, number, comment, date) VALUES (?,?,?,?, NOW())', [name, email,number,comment], (err, results) => {
        if (err){
            console.log('Erro ao inserir dados no banco de dados:', err);
            return res.redirect('/')
        }
        console.log('Dados inseridos com sucesso!');
        res.redirect('/');
    });
});

module.exports = router;