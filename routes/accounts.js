import express from 'express';

import accountController from '../controllers/accountController.js';

const app = express();

app.post('/', accountController.create);

app.get('/', accountController.findAll);

app.get('/:id', accountController.findOne);

app.put('/:id', accountController.update);

app.delete('/:id', accountController.remove);

export { app as accountRouter };