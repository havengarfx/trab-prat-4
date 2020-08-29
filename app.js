import express from 'express';
import gradesRouter from './routes/grades.js';
import { promises as fs } from 'fs';
import mongoose from 'mongoose';
import { accountModel } from './models/accountmodel.js';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);
(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dbUser:dbUserPass@cluster0.aba5z.mongodb.net/bank?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Conectado no MongoDB');
  } catch (error) {
    console.log('Erro ao conectar no MongoDB');
  }
})();

app.listen(3000, async () => {
  const data = JSON.parse(await readFile('accounts-3.json'));
  const{agencia, conta, name, balance}=data;
for (let index = 0; index < data.length; index++) {
  
  

  const account = new accountModel({agencia:agencia,conta:conta,name:name,balance:balance});
  account.save();}
});
