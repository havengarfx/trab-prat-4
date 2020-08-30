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
    const balance = data.balance.toString();
    if (!data) {
      res.send('Nao encontrada a conta: ' + conta);
    } else {
      res.send(balance);
    }
  } catch (error) {
    res
      .status(500)
      .send('Erro ao buscar o saldo da conta: ' + conta + ' ' + error);
  }
};

const removeAndShowNumberTotalAccounts = async (req, res) => {
  const agencia = req.params.agencia;
  const conta = req.params.conta;

  try {
    const data = await Account.findOneAndRemove({
      agencia: agencia,
      conta: conta,
    });
    const dataAgency = await Account.find({ agencia: agencia });

    if (!data) {
      res.send('Nao encontrada a conta: ' + conta);
    } else {
      res.send(
        'Conta excluida com sucesso. Total de contas ativas desta agencia: ' +
          dataAgency.length
      );
    }
  } catch (error) {
    res.status(500).send('Erro ao excluir da conta: ' + conta + ' ' + error);
  }
};

const transfer = async (req, res) => {
  const contaOrigem = req.params.contaorigem;
  const contaDestino = req.params.contadestino;
  let valueTransfer = Number(req.params.valuetransfer);

  try {
    const dataDestino = await Account.findOneAndUpdate(
      { conta: contaDestino },
      { $inc: { balance: valueTransfer } },

      {
        new: true,
      }
    );
    const dataAgenciaOrigem = await Account.findOne({ conta: contaOrigem });
    if (dataAgenciaOrigem.agencia !== dataDestino.agencia) {
      valueTransfer = valueTransfer + 8;
      console.log(valueTransfer);
    }
    const dataOrigem = await Account.findOneAndUpdate(
      { conta: contaOrigem },
      { $inc: { balance: -valueTransfer } },

      {
        new: true,
      }
    );
    let balanceOrigem = dataOrigem.balance.toString();
    let balanceDestino = dataDestino.balance.toString();
    if (!dataDestino && !dataOrigem) {
      res.send('Nao encontradas as contas: ');
    } else {
      res.send(balanceOrigem + '-' + balanceDestino);
    }
  } catch (error) {
    res
      .status(500)
      .send('Erro ao atualizar a conta: ' + contaOrigem + ' ' + error);
  }
};

const media = async (req, res) => {
  const agencia = req.params.agencia;
  try {
    const data = await Account.find({ agencia: agencia });
    const sumAllBalance = data.reduce((acc, curr) => {
      return acc + curr.balance;
    }, 0);
    const media = sumAllBalance / data.length;
    const resultMedia = media.toString();
    res.send(resultMedia);
  } catch (error) {
    res.status(500).send('Erro ao buscar todos os podcasts' + error);
  }
};

const lessBalance = async (req, res) => {
  const limite = Number(req.params.limite);
  try {
    const data = await Account.find({}, { _id: 0, name: 0 })
      .sort({ balance: 1 })
      .limit(limite);

    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao buscar todos os podcasts' + error);
  }
};

const moreBalance = async (req, res) => {
  const limite = Number(req.params.limite);
  try {
    const data = await Account.find({}, { _id: 0 })
      .sort({ balance: -1, name: 1 })
      .limit(limite);

    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao buscar todos os podcasts' + error);
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
  removeAndShowNumberTotalAccounts,
  transfer,
  media,
  lessBalance,
  moreBalance,
};
