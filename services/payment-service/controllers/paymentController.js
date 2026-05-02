let payments = [];

exports.createPayment = (req, res) => {

  try {

    const { booking_id, amount, method } = req.body;

    if (!booking_id || !amount) {
      return res.status(422).json({
        message: 'booking_id dan amount wajib'
      });
    }

    const payment = {
      id: payments.length + 1,
      booking_id,
      amount,
      method: method || 'transfer',
      status: 'paid',
      created_at: new Date()
    };

    payments.push(payment);

    res.status(201).json({
      message: 'Payment success',
      payment
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getPayments = (req, res) => {

  res.status(200).json(payments);

};