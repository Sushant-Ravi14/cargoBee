const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { getMe, updateMe, getWallet, topUpWallet, addSavedAddress } = require('../controllers/user.controller');

router.use(protect); // All user routes require authentication

router.get('/me', getMe);
router.put('/me', updateMe);
router.get('/wallet', getWallet);
router.post('/wallet/topup', topUpWallet);
router.post('/saved-address', addSavedAddress);

module.exports = router;
