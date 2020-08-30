import express from 'express';

import accountController from '../controllers/accountController.js';

const app = express();

app.post('/', accountController.create);

app.get('/', accountController.findAll);

app.get('/:id', accountController.findOne);

app.put('/:id', accountController.update);

app.delete('/:id', accountController.remove);

app.put('/deposit/:agencia/:conta', accountController.deposit);

app.put('/withdraw/:agencia/:conta', accountController.withdraw);

app.get('/balance/:agencia/:conta', accountController.balance);

app.delete(
  '/removeandshownumberaccounts/:agencia/:conta',
  accountController.removeAndShowNumberTotalAccounts
);

app.put(
  '/transfer/:contaorigem/:contadestino/:valuetransfer',
  accountController.transfer
);

app.get('/media/:agencia', accountController.media);

app.get('/lessbalance/:limite', accountController.lessBalance);

app.get('/morebalance/:limite', accountController.moreBalance);

app.put('/transfertoprivate/:priva', accountController.transferToPrivate);

export { app as accountRouter };
