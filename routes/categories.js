const { json } = require('express');
var express = require('express');
var router = express.Router();
const fs = require('fs');
var yup = require('yup')
const {
    insertDocument,
    insertDocuments,
    updateDocumentByID,
    deleteDocument,
    deleteDocuments,
    findDocument,
    findDocuments,
} = require('../mongodb/method');

const { validateSchema } = require('./schemas.yup');

/* GET users listing. */
router.get('/', function (req, res) {
    try {
        res.json({ ok: true });
    } catch (error) {
        res.sendStatus(error);
    }
});
router.post('/insert', (req, res) => {
    insertDocument(data, 'categories')
        .then((result) => {
            res.status(200).json({ status: 'success', result });
        })
        .catch((err) => {
            res.status(500).json({ status: 'Failed!', err });
        });
});

router.post('/inserts', (req, res) => {
    const data = req.body;
    insertDocuments(data, 'categories')
        .then((result) => {
            res.status(200).json({ status: 'success', result });
        })
        .catch((err) => {
            res.status(500).json({ status: 'Failed!', err });
        });
});

router.patch('/update/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    updateDocumentByID(id, data, 'categories')
        .then((result) => {
            res.status(200).json({ status: 'ok', result, data });
        })
        .catch((err) => {
            res.status(500).json({ status: 'Failed!', err });
        });
});

router.get(
    '/search/name',
    validateSchema(
        yup.object({
            query: yup.object({
                name: yup.string().required(),
            }),
        }),
    ),
    function (req, res, next) {
        const { name } = req.query;

        // QUERY
        // const query = { name: text };
        const query = { name: new RegExp(`^${name}`) };

        // SORT
        const sort = { name: -1 };

        //LIMIT
        const limit = 10;

        //SKIP
        const skip = 0;

        // PROJECTION: which fields you need
        const projection = { name: 1 };

        findDocuments(query, 'categories', sort, limit, [], skip, projection)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({status:'failed!'});
            });
    },
);

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
