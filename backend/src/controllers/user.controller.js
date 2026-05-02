const User = require('../models/User');

// @GET /api/user/me
const getMe = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

// @PUT /api/user/me
const updateMe = async (req, res) => {
  try {
    const { name, email, profilePic, homeAddress, officeAddress, vehicleNo, licenseNumber } = req.body;

    // Build update object — only include fields that are present
    const update = {};
    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;
    if (profilePic !== undefined) update.profilePic = profilePic;
    if (homeAddress !== undefined) update.homeAddress = homeAddress;
    if (officeAddress !== undefined) update.officeAddress = officeAddress;
    if (vehicleNo !== undefined) update.vehicleNo = vehicleNo;
    if (licenseNumber !== undefined) update.licenseNumber = licenseNumber;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      update,
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/user/wallet
const getWallet = async (req, res) => {
  const user = await User.findById(req.user._id).select('walletBalance walletTransactions');
  return res.status(200).json({
    success: true,
    walletBalance: user.walletBalance,
    transactions: user.walletTransactions.sort((a, b) => b.createdAt - a.createdAt),
  });
};

// @POST /api/user/wallet/topup
const topUpWallet = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const user = await User.findById(req.user._id);
    user.walletBalance += Number(amount);
    user.walletTransactions.push({
      type: 'credit',
      amount: Number(amount),
      description: 'Wallet Top-up',
    });
    await user.save();

    return res.status(200).json({
      success: true,
      walletBalance: user.walletBalance,
      message: `₹${amount} added to wallet`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/user/saved-address
const addSavedAddress = async (req, res) => {
  try {
    const { label, address, lat, lng } = req.body;
    const user = await User.findById(req.user._id);
    user.savedAddresses.push({ label, address, coordinates: { lat, lng } });
    await user.save();
    return res.status(201).json({ success: true, savedAddresses: user.savedAddresses });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getMe, updateMe, getWallet, topUpWallet, addSavedAddress };
