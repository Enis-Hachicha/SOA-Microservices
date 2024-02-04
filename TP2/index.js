const express = require('express');
const db = require('./database');
const app = express();
app.use(express.json());
const PORT = 3001;
app.get('/', (_req, res) => {
    res.json("Registre de personnes! Choisissez le bon routage!")
})
// Récupérer toutes les personnes
app.get('/personnes', async (_req, res) => {
    const [ results ] = await db.executeQuery("SELECT * FROM personnes", [], (err, rows) => {
        if (err) {
            res.status(400).json({
            "error": err.message
            })}
        });
    res.json({
        "message": "success",
        "data": results
        });
        
});

// Récupérer une personne par ID
app.get('/personnes/:id', async (req, res) => {
    const id = req.params.id;
    const [ results ] = await db.executeQuery("SELECT * FROM personnes WHERE id = ?", [id], (err, row) => {
    if (err) {
        res.status(400).json({
            "error": err.message
            })}
        });
    res.json({
        "message": "success",
        "data": results });
    
});
// Créer une nouvelle personne
app.post('/personnes',async (req, res) => {
    const {nom, address} = req.body;
    const [ results ] = await db.executeQuery(`INSERT INTO personnes (nom, address) VALUES (?, ?)`, [nom, address], function(err) {
        if (err) {
            res.status(400).json({
            "error": err.message
            }) }
        });

    res.json({
            "message": "success",
            "data": results
        });
});

// Mettre à jour une personne
app.put('/personnes/:id',async (req, res) => {
    const id = req.params.id;
    const {nom, address} = req.body;
    const [ results ] = await db.executeQuery(`UPDATE personnes SET nom = ? , address = ? WHERE id = ?`, [nom, address, id], function(err) {
        if (err) {
            res.status(400).json({
            "error": err.message
            })}
        });
    res.json({
            "message": "success",
            "data": results
        });
        
});
// Supprimer une personne
app.delete('/personnes/:id',async (req, res) => {
    const id = req.params.id;
    const [ results ] = await db.executeQuery(`DELETE FROM personnes WHERE id = ?`, [id], function(err) {
        if (err) {
            res.status(400).json({
            "error": err.message
            })}
        });
    res.json({
        "message": "success",
        "data": results
    });
    
});

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`); });