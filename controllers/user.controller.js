const User = require("../models/user.model");
const mongoose = require('mongoose');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsersByAuth = async (req, res) => {
  try{
    const authenticatedUserId = req.user._id;
    const userId = new mongoose.Types.ObjectId(authenticatedUserId);
    const user = await User.findById(userId);
    if(!user){
      res.status(404).json('User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, ...updateData } = req.body;

    const requestRole = req.user?.role;

    if (requestRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can update user data." });
    }

    if (role && !["user", "admin", "service manager"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (role) {
      updateData.role = role;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User data updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
};

const userUpdate = async (req, res) => {
  try {
    const userId = req.params.id; 
    const updateData = req.body; 
    const profilePictureUrl = req.fileUrl || null; 

    if (profilePictureUrl) {
      updateData.profilePicture = profilePictureUrl;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: error.message });
  }
};





const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({ message: "User data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsersByAuth,
  userUpdate,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
