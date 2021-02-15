const express = require('express');
const router = express.Router();
const postgres = require('../postgres.js');


router.get('/', (req, res) => {
    postgres.query('SELECT * FROM todo ORDER BY id ASC;', (err, results) => {
        res.json(results.rows)
    });
});

router.get('/:id', (req, res) => {
    postgres.query(`SELECT * FROM todo WHERE id = ${req.params.id};`, (err, results) => {
        res.json(results.rows[0])
    });
});

router.post('/', (req, res) => {
    postgres.query(`INSERT INTO todo (description) VALUES ('${req.body.description}')`, 
    (err, results) => {
        postgres.query('SELECT * FROM todo ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

router.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM todo WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM todo ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    });
});

router.put('/:id', (req, res) => {
    postgres.query(`UPDATE todo SET description = '${req.body.description}' WHERE id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM todo ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

module.exports = router;
