const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const PremiumPlan = require('../models/PremiumPlan');

router.post('/update-plan',auth, async (req, res) => {
    const { planId } = req.body;
    const userId = req.user.id;
    try {
        const plan=await PremiumPlan.findById(planId)
        const user=await User.findByIdAndUpdate(userId, { plan: plan.name });

        const remainingPlans = await PremiumPlan.find({ _id: { $ne: planId } });

        res.json({remainingPlans,user});
    } catch (error) {
        console.error('Failed to update plan:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;