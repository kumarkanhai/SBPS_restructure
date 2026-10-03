require('dotenv').config();

const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const News = require('../models/News');
const Event = require('../models/Event');
const Faculty = require('../models/Faculty');
const Gallery = require('../models/Gallery');
const Program = require('../models/Program');
const Sport = require('../models/Sport');

const seedData = async () => {
  try {
    await connectDB();

    await News.deleteMany({});
    await Event.deleteMany({});
    await Faculty.deleteMany({});
    await Gallery.deleteMany({});
    await Program.deleteMany({});
    await Sport.deleteMany({});

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sbps.local';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.findOneAndUpdate(
      { email: adminEmail },
      {
        name: 'SBPS Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN'
      },
      { upsert: true, new: true }
    );

    await News.insertMany([
      {
        title: 'Students compete at national sports events',
        slug: 'national-sports-events',
        excerpt: 'A dynamic achievement story managed from the CMS.',
        content: 'Achievement details can be edited from the admin panel.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200',
        category: 'Sports',
        featured: true
      },
      {
        title: 'Admissions information for the new session',
        slug: 'admissions-new-session',
        excerpt: 'Important admission updates, dates and documents.',
        content: 'Admission details can be updated by the admin team.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200',
        category: 'Admissions'
      },
      {
        title: 'Campus learning and activity update',
        slug: 'campus-learning-update',
        excerpt: 'Academic and co-curricular highlights from campus.',
        content: 'Campus update.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
        category: 'Academics'
      }
    ]);

    await Event.insertMany([
      {
        title: 'Annual Sports Meet',
        description: 'Inter-house athletics and team competitions.',
        date: new Date('2026-11-15'),
        category: 'Sports'
      },
      {
        title: 'Parent Orientation',
        description: 'Meet faculty and understand the academic year.',
        date: new Date('2026-10-20'),
        category: 'Academics'
      }
    ]);

    await Faculty.insertMany([
      {
        name: 'Academic Mentor',
        designation: 'Senior Faculty',
        department: 'Science',
        photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600'
      },
      {
        name: 'Sports Coach',
        designation: 'Head Coach',
        department: 'Sports',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600'
      }
    ]);

    await Gallery.insertMany([
      {
        title: 'Campus life',
        category: 'Campus',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000'
      },
      {
        title: 'Sports training',
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000'
      },
      {
        title: 'Students learning',
        category: 'Academics',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000'
      }
    ]);

    await Program.insertMany([
      {
        title: 'JEE Preparation',
        slug: 'jee-preparation',
        description: 'Engineering-focused academic and competitive preparation.',
        category: 'JEE',
        features: ['Concept building', 'Regular tests', 'Mentorship']
      },
      {
        title: 'NEET Preparation',
        slug: 'neet-preparation',
        description: 'Medical entrance preparation integrated with academics.',
        category: 'NEET',
        features: ['Physics', 'Chemistry', 'Biology']
      },
      {
        title: 'NDA Preparation',
        slug: 'nda-preparation',
        description: 'Defence-oriented academic and personality development program.',
        category: 'NDA',
        features: ['Written preparation', 'Fitness', 'Leadership development']
      }
    ]);

    await Sport.insertMany([
      {
        name: 'Cricket',
        description: 'Structured cricket training and competitions.',
        coach: 'Sports Coach',
        achievements: ['Inter-school participation']
      },
      {
        name: 'Football',
        description: 'Football training, team practice and competitions.',
        coach: 'Sports Coach',
        achievements: ['School team competitions']
      },
      {
        name: 'Fencing',
        description: 'Specialized fencing training for student athletes.',
        coach: 'Sports Coach',
        achievements: ['Competitive participation']
      },
      {
        name: 'Shooting',
        description: 'Sports shooting and disciplined training program.',
        coach: 'Sports Coach',
        achievements: ['Student participation']
      },
      {
        name: 'Boxing',
        description: 'Boxing training focused on technique, fitness and discipline.',
        coach: 'Sports Coach',
        achievements: ['Inter-school participation']
      },
      {
        name: 'Athletics',
        description: 'Track and field training across multiple disciplines.',
        coach: 'Sports Coach',
        achievements: ['Athletics meets']
      }
    ]);

    console.log('Seed completed successfully');
    console.log(`Admin email: ${adminEmail}`);
    console.log(`Admin password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.log('Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
