const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb+srv://gademanicharan12:premiumFeatures@cluster0.lvk8nfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createDummyData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [
      {
        email: 'user1@example.com',
        password: hashedPassword,
        userType: 'user',
        plan: 'free',
        skills: ['JavaScript', 'React', 'Node.js'],
        certifications: ['Web Development Basics']
      },
      {
        email: 'user2@example.com',
        password: hashedPassword,
        userType: 'user',
        plan: 'premium',
        skills: ['Python', 'Django', 'Machine Learning'],
        certifications: ['Data Science Fundamentals', 'Advanced Python']
      },
      {
        email: 'recruiter1@company.com',
        password: hashedPassword,
        userType: 'recruiter',
        plan: 'free',
        company: 'Tech Innovators Inc.'
      },
      {
        email: 'recruiter2@company.com',
        password: hashedPassword,
        userType: 'recruiter',
        plan: 'premium',
        company: 'Global Software Solutions'
      }
    ];

    await User.insertMany(users);

    console.log('Dummy data created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating dummy data:', error);
    mongoose.connection.close();
  }
};

createDummyData();