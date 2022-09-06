const { json } = require('express');
var express = require('express');
const fs = require('fs');
const { insertDocument, insertDocuments } = require('../mongodb/method');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    try {
        res.json({ ok: true });
    } catch (error) {
        res.sendStatus(error);
    }
});
router.post('/insert', (req, res) => {
    console.log(data);
    insertDocument(data, 'categories')
        .then((result) => {
            res.status(200).json({ status: 'success', result });
        })
        .catch((err) => {
            res.status(500).json({ status: 'Failed!', err });
        });
});

router.post('/inserts', (req, res) => {
    data = req.body;
    console.log(data);
    insertDocuments(data, 'categories')
        .then((result) => {
            res.status(200).json({ status: 'success', result });
        })
        .catch((err) => {
            res.status(500).json({ status: 'Failed!', err });
        });
});
// // GET WITH PARAMS
// router.get('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const category = data.find((category) => category.id === id);
//     if (!category)
//         return res.status(401).json({
//             statusCode: 401,
//             message: 'Category not found',
//         });
//     res.json(category);
// });

// // Create a Category
// router.post('/', (req, res) => {
//     const newCategory = {
//         id: data.length + 1,
//         name: req.body.name,
//         description: req.body.description,
//     };
//     if (req.body.name && req.body.description) {
//         data.push(newCategory);
//         fs.appendFile(fileName, JSON.parse(newCategory));
//         console.log(data);
//         res.status(201).json({
//             statusCode: 201,
//         });
//         return;
//     }
//     res.status(410).json({
//         statusCode: 410,
//     });
// });

// // Update a Category
// router.put('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const index = data.findIndex((category) => category.id === id);
//     if (req.body.name && req.body.description) {
//         const updatedCategory = {
//             id: data[index].id,
//             name: req.body.name,
//             description: req.body.description,
//         };
//         data[index] = updatedCategory;
//         res.status(200).json(data[index]);
//         return;
//     }
//     res.status(410).json({
//         statusCode: 410,
//     });
// });

// // Delete a Category
// router.delete('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const index = data.findIndex((category) => category.id === id);
//     data.splice(index, 1);
//     res.status(201).json({
//         statusCode: 201,
//     });
// });
module.exports = router;
