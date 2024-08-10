// routes/dashboard.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const PremiumPlan=require('../models/PremiumPlan')

// Get user dashboard
router.get('/user-dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user.userType !== 'user') {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get recruiter dashboard
router.get('/recruiter-dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user.userType !== 'recruiter') {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/premium-plans',auth,async(req,res)=>{
  try {
    const user = await User.findById(req.user.id);
    const plans= await PremiumPlan.find({userType:`${user.userType}`})
    
    res.json(plans)
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// Upgrade to premium plan
router.post('/upgrade-plan', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.plan = 'premium';
    await user.save();
    res.json({ msg: 'Upgraded to premium plan successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;