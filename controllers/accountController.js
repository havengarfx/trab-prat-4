import { db } from '../models/db.js';

const Account = db.account;

const create = async (req, res) => {
  const account = new Account({
    agencia: req.body.agencia,
    conta: req.body.conta,
    name: req.body.name,
    balance: req.body.balance,
  });

  try {
    const data = await account.save();

    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao salvar o podcast ' + error);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Account.find();

    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao buscar todos os podcasts' + error);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Account.findById({ _id: id });

    if (!data) {
      res.send('Nao encontrato o podcast id: ' + id);
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar o podcast id: ' + id + ' ' + error);
  }
};

const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Account.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res.send('Nao encontrato o podcast id: ' + id);
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar o podcast id: ' + id + ' ' + error);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Account.findByIdAndRemove({ _id: id });

    if (!data) {
      res.send('Nao encontrato o podcast id: ' + id);
    } else {
      res.send('Podcast excluido com sucesso');
    }
  } catch (error) {
    res.status(500).send('Erro ao excluir o podcast id: ' + id + ' ' + error);
  }
};

const deposit = async (req, res) => {
  const agencia = req.params.agencia;
  const conta = req.params.conta;
  const name = req.params.name;
  const deposit = req.body.deposit;
  // const newBalance=data.balance + deposit

  try {
    const data = await Account.findOneAndUpdate(
      { agencia: agencia, conta: conta, name: name },
      { $inc: { balance: deposit } },

      {
        new: true,
      }
    );

    if (!data) {
      res.send('Nao encontrada a conta: ' + conta);
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar a conta: ' + conta + ' ' + error);
  }
};

const withdraw = async (req, res) => {
  const agencia = req.params.agencia;
  const conta = req.params.conta;
  const name = req.params.name;
  const withdraw = req.body.withdraw - 1;
  // const newBalance=data.balance + deposit

  try {
    const data = await Account.findOneAndUpdate(
      { agencia: agencia, conta: conta, name: name },
      { $inc: { balance: -withdraw } },

      {
        new: true,
      }
    );

    if (!data) {
      res.send('Nao encontrada a conta: ' + conta);
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar a conta: ' + conta + ' ' + error);
  }
};

const balance = async (req, res) => {
  const agencia = req.params.agencia;
  const conta = req.params.conta;

  try {
    const data = await Account.findOne({ agencia: agencia, conta: conta });

    if (!data) {
      res.send('Nao encontrato o podcast id: ' + id);
    } else {
      res.send(data.balance);
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar o podcast id: ' + id + ' ' + error);
  }
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
  deposit,
  withdraw,
  balance,
};
