var express = require('express');
var router = express.Router();

const {
    insertDocument,
    insertDocuments,
    updateDocumentByID,
    deleteDocument,
    deleteDocuments,
    findDocument,
    findDocuments,
} = require('../mongodb/method');

const { validateSchema, supplierSchema } = require('./schemas.yup');

const collectionName = 'suppliers';

router.get('/', (req, res) => {
    findDocuments({}, collectionName, {}, 50, [
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'categories',
            },
        },
    ])
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

module.exports = router;
