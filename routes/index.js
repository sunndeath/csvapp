var express = require('express');
var router = express.Router();

var csv = require('csv-parser');
var fs = require('fs');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'csvapp' });
});

router.get('/data', (req, res) => {
    let exampleResult = [];
    let dictionaryResult = [];

    fs.createReadStream('dictionary.csv')
        .pipe(csv())
        .on('error', error => console.log('!!error', error))
        .on('data', data => dictionaryResult.push(data))
        .on('end', () => {
            fs.createReadStream('example.csv')
                .pipe(csv())
                .on('error', error => console.log('!!error', error))
                .on('data', data => exampleResult.push(data))
                .on('end', () => res.json({ example: exampleResult, dictionary: dictionaryResult }));
        });
});

module.exports = router;
