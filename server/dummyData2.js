const mongoose = require('mongoose');
const PremiumPlan = require('./models/PremiumPlan');

// Connect to MongoDB
mongoose.connect('mongodb+srv://gademanicharan12:premiumFeatures@cluster0.lvk8nfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seeding script
const seedPremiumPlans = async () => {
  const plans = [
    {
      name: 'BASIC',
      price: 59,
      features: [
        { text: "Lorem ipsum dolor sit amet", included: true },
        { text: "consectetuer adipiscing elit", included: true },
        { text: "euismod tincidunt ut", included: false },
        { text: "Ut wisi enim ad minim", included: true },
        { text: "Lorem ipsum dolor sit amet", included: false },
        { text: "consectetuer adipiscing elit", included: true }
      ],
      userType: 'user'
    },
    {
      name: 'STANDARD',
      price: 89,
      features: [
        { text: "Lorem ipsum dolor sit amet", included: true },
        { text: "consectetuer adipiscing elit", included: true },
        { text: "euismod tincidunt ut", included: false },
        { text: "Ut wisi enim ad minim", included: true },
        { text: "Lorem ipsum dolor sit amet", included: true },
        { text: "consectetuer adipiscing elit", included: true }
      ],
      userType: 'user'
    },
    {
      name: 'PREMIUM',
      price: 119,
      features: [
        { text: "Lorem ipsum dolor sit amet", included: true },
        { text: "consectetuer adipiscing elit", included: true },
        { text: "euismod tincidunt ut", included: true },
        { text: "Ut wisi enim ad minim", included: true },
        { text: "Lorem ipsum dolor sit amet", included: true },
        { text: "consectetuer adipiscing elit", included: true }
      ],
      userType: 'user'
    },
    {
      name: 'BASIC',
      price: 79,
      features: [
        { text: "Access to candidate database", included: true },
        { text: "Unlimited job postings", included: true },
        { text: "View candidate profiles", included: true },
        { text: "Basic analytics and reports", included: false },
        { text: "Priority customer support", included: false },
        { text: "Featured job postings", included: false }
      ],
      userType: 'recruiter'
    },
    {
      name: 'STANDARD',
      price: 109,
      features: [
        { text: "Access to candidate database", included: true },
        { text: "Unlimited job postings", included: true },
        { text: "View candidate profiles", included: true },
        { text: "Basic analytics and reports", included: true },
        { text: "Priority customer support", included: true },
        { text: "Featured job postings", included: false }
      ],
      userType: 'recruiter'
    },
    {
      name: 'PREMIUM',
      price: 149,
      features: [
        { text: "Access to candidate database", included: true },
        { text: "Unlimited job postings", included: true },
        { text: "View candidate profiles", included: true },
        { text: "Basic analytics and reports", included: true },
        { text: "Priority customer support", included: true },
        { text: "Featured job postings", included: true }
      ],
      userType: 'recruiter'
    }
  ];

  try {
    await PremiumPlan.deleteMany({});
    await PremiumPlan.insertMany(plans);
    console.log('Premium plans seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding premium plans:', error);
  }
};

// Run this function to seed the database
seedPremiumPlans();
