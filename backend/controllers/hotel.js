import Hotel from '../models/Hotel.js';

export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  // console.log('limit:', limit); //Debugging Statment
  try {
    const findHotels = await Hotel.find({
      ...others,
      cheapsetPrice: { $gte: min || 1, $lte: max || 9999 },
    }).limit(limit);
    res.status(200).json(findHotels);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const findHotel = await Hotel.findById(req.params.id);
    res.status(200).json(findHotel);
  } catch (err) {
    next(err);
  }
};

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted.');
  } catch (err) {
    next(err);
  }
};

// we gonna filter hotels by type and counted them, next we add the count number & type in the client side
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
    res.status(200).json([
      { type: 'hotels', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// we gonna search of hotels by cities and counted , next we add the count number in the client side
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
