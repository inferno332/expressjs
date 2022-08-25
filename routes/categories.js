const { json } = require('express');
var express = require('express');
const fs = require('fs');
var router = express.Router();

const fileName = 'data.json';
const data = [
    {
        id: 1,
        name: 'CPU',
        description: 'Cac loai CPU cho may tinh',
    },
    {
        id: 2,
        name: 'HDD',
        description: 'Cac loai dia cung cho may tinh',
    },
    {
        id: 3,
        name: 'CARD',
        description: 'Cac loai card cho may tinh',
    },
];
/* GET users listing. */
router.get('/', function (req, res) {
    try {
        res.json(data);
    } catch (error) {
        res.sendStatus(error);
    }
});
// GET WITH PARAMS
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const category = data.find((category) => category.id === id);
    if (!category)
        return res.status(401).json({
            statusCode: 401,
            message: 'Category not found',
        });
    res.json(category);
});

// Create a Category
router.post('/', (req, res) => {
    const newCategory = {
        id: data.length + 1,
        name: req.body.name,
        description: req.body.description,
    };
    if (req.body.name && req.body.description) {
        data.push(newCategory);
        fs.appendFile(fileName, JSON.parse(newCategory));
        console.log(data);
        res.status(201).json({
            statusCode: 201,
        });
        return;
    }
    res.status(410).json({
        statusCode: 410,
    });
});

// Update a Category
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = data.findIndex((category) => category.id === id);
    if (req.body.name && req.body.description) {
        const updatedCategory = {
            id: data[index].id,
            name: req.body.name,
            description: req.body.description,
        };
        data[index] = updatedCategory;
        res.status(200).json(data[index]);
        return;
    }
    res.status(410).json({
        statusCode: 410,
    });
});

// Delete a Category
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = data.findIndex((category) => category.id === id);
    data.splice(index, 1);
    res.status(201).json({
        statusCode: 201,
    });
});
module.exports = router;
