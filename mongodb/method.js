// Khai bao MongoClient
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const DATABASE_NAME = 'api-training';
const CONNECTION_STRING = 'mongodb://localhost:27017/' + DATABASE_NAME;

// INSERT: Thêm mới (một)
function insertDocument(data, collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(CONNECTION_STRING)
            .then((client) => {
                const dbo = client.db(DATABASE_NAME);
                const collection = dbo.collection(collectionName);
                collection
                    .insertOne(data)
                    .then((result) => resolve({ data: data, result: result }))
                    .catch((err) => reject(err))
                    .finally(() => {
                        client.close();
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// INSERT: Thêm mới (nhiều)
function insertDocuments(data, collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(CONNECTION_STRING)
            .then((client) => {
                const dbo = client.db(DATABASE_NAME);
                const collection = dbo.collection(collectionName);
                collection
                    .insertMany(data)
                    .then((result) => resolve({ data: data, result: result }))
                    .catch((err) => reject(err))
                    .finally(() => client.close());
            })
            .catch((err) => reject(err));
    });
}

// UPDATE: Sửa theo ID
function updateDocumentByID(id, data, collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(CONNECTION_STRING)
            .then((client) => {
                const dbo = client.db(DATABASE_NAME);
                const collection = dbo.collection(collectionName);
                const query = { _id: ObjectID(id) };
                collection
                    .findOneAndUpdate(query, { $set: data })
                    .then((result) => resolve(result))
                    .catch((err) => reject(err))
                    .finally(() => client.close());
            })
            .catch((err) => reject(err));
    });
}

module.exports = { insertDocument, insertDocuments };
