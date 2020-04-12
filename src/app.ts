import express from 'express';
import * as path from 'path';
import { mapRequests } from './mock-mapper';
const app = express();
const port = 3000

const mockRequests = mapRequests(path.resolve(__dirname, 'mocks'));

const mocksRouter = express.Router();
for (const mockRequest of mockRequests.values()) {
    mocksRouter.all(mockRequest.path, (req, res) => {
        const key = `${req.method.toLowerCase()}_${req.path}`;

        const mocks = mockRequests.get(key)?.mocks;
        if (!mocks) {
            res.status(404).end();
            return;
        }

        for (const mock of mocks) {
            console.log(`${JSON.stringify(mock.request.queryParams)} = ${JSON.stringify(req.query)} ? ${JSON.stringify(mock.request.queryParams) === JSON.stringify(req.query)}`);
            console.log(`${JSON.stringify(mock.request.body)} = ${JSON.stringify(req.body) || {}} ? ${(JSON.stringify(mock.request.body) === JSON.stringify(req.body) || {})}`);

            if (areQueryStringsEqual(mock.request.queryParams, req.query) &&
                (JSON.stringify(mock.request.body) === JSON.stringify(req.body) || {})) {
                res.status(mock.response.code).send(mock.response.payload);
                return;
            }
        }

        res.status(404).end();
    });
}

app.use('/api', mocksRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// function parse(queryParams){
//     const parts = queryParams.split('&');
//     const parsedQueryParams = {};
//     for (const part of parts){
//         const keyValuePair = part.split('=');
//         parsedQueryParams[keyValuePair[0]] = decodeURIComponent(keyValuePair[1]);
//     }
//     return JSON.stringify(parsedQueryParams);

// }

function areQueryStringsEqual(mockQueryString: object | string, requestQueryString: object) {
    if (typeof mockQueryString === 'object') {
        return JSON.stringify(mockQueryString) === JSON.stringify(requestQueryString)
    }
    
    else if (typeof mockQueryString === 'string'){
        const regex = new RegExp(mockQueryString);
        return JSON.stringify(requestQueryString).match(regex);
    }
}