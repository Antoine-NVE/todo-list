const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

const taskRoutes = require('./routes/task.routes');

mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.error(`Connexion à MongoDB échouée : ${error}`));

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/task', taskRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
});
