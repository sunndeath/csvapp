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
    let firstHeader = null;

    fs.createReadStream('dictionary.csv')
        .pipe(csv())
        .on('error', error => console.log('!!error', error))
        .on('data', data => dictionaryResult.push(data))
        .on('end', () => {
            fs.createReadStream('./labels.csv')
                .pipe(csv())
                .on('error', error => console.log('!!error', error))
                .on('headers', (headers) => {
                    firstHeader = headers[0];
                })
                .on('data', data => exampleResult.push(data))
                .on('end', () => {
                    const hasData = exampleResult.length > 0;
                    const isZero = firstHeader === '0';

                    if (!hasData && !isZero) {
                        exampleResult.push(firstHeader);
                    }

                    res.json({ example: exampleResult, dictionary: dictionaryResult })
                })
        });
});

module.exports = router;
