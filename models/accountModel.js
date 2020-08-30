export default (mongoose) => {
  const accountSchema = mongoose.Schema({
    agencia: {
      type: Number,
      required: true,
    },
    conta: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
      // //Valida se a nota inserida e' menor que zero
      // validate(value) {
      //   if (value < 0) throw new Error('Valor negativo para nota');
      // },
    },
    // lastModified: {
    //   type: Date,
    //   default: Date.now,
    // },
  });

  const Account = mongoose.model('account', accountSchema, 'account');

  return Account;
};
