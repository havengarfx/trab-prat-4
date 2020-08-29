import express from 'express';

import accountController from '../controllers/accountController.js';

const app = express();

app.post('/', accountController.create);

app.get('/', accountController.findAll);

app.get('/:id', accountController.findOne);

app.put('/:id', accountController.update);

app.delete('/:id', accountController.remove);

app.put('/deposit/:agencia/:conta/:name', accountController.deposit);

app.put('/withdraw/:agencia/:conta/:name', accountController.withdraw);

app.get('/balance/:agencia/:conta', accountController.balance);

app.delete('/removeandshownumberaccounts/:agencia/:conta', accountController.removeAndShowNumberTotalAccounts);

export { app as accountRouter };
