const axios = require('axios');

let bookings = [];

exports.createBooking = async (req, res) => {

  try {

    const { property_id, room_number, user_id } = req.body;

    const property = await axios.get(
      `${process.env.PROPERTY_SERVICE}/api/properties`
    );

    const booking = {
      id: bookings.length + 1,
      property_id,
      room_number,
      user_id,
      status: 'booked'
    };

    bookings.push(booking);

    res.status(201).json({
      message: 'Booking success',
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getBookings = (req, res) => {

  res.json(bookings);

};