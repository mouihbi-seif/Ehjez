import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const getRooms = async (req, res, next) => {
  try {
    const findRooms = await Room.find();
    res.status(200).json(findRooms);
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const findRoom = await Room.findById(req.params.id);
    res.status(200).json(findRoom);
  } catch (err) {
    next(err);
  }
};

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    res.status(200).json('Room has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const updateAvailbleRoom = ()=>{
  
}
