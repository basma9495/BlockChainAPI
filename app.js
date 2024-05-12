
const express = require('express');
const blockRoutes = require('/routes/blockRoutes');

const app = express();


const port = process.env.PORT || 3000;


app.use(express.json());


app.use('/block', blockRoutes);

app.listen(port, () => {
    console.log(`Servern lyssnar på port ${port}`);
});

module.exports = app;
