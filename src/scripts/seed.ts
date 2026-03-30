import mongoose from 'mongoose';
import { ProfileModel, ExperienceModel, EducationModel, SkillModel, ProjectModel } from '../models/CVData';
import { UserModel } from '../models/User';
import { getMongoConfig } from '../lib/mongodb-config';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const seedData = {
  profile: {
    name: { en: 'Tanakhom Rattanasrisawat', th: 'ธนาคม รัตนศรีสวัสดิ์' },
    role: { en: 'Software Developer', th: 'นักพัฒนาซอฟต์แวร์' },
    bio: {
      en: 'Front-end Developer and Game Developer with over 7 years of experience. I like researched a new technologies and techniques for working.',
      th: 'นักพัฒนาฟรอนต์เอนด์ที่มีประสบการณ์ 7 ปี. ชอบที่จะเรียนรู้เทคโนโลยีและเทคนิคใหม่ๆ เสมอ',
    },
    email: 'tanakhom.rattana@hotmail.com',
    phone: '+66882283284',
    github: 'https://github.com/tr-pong',
    linkedin: 'https://www.linkedin.com/in/tanakhom-rat/',
    location: { en: 'Bangkok, Thailand', th: 'กรุงเทพมหานคร, ประเทศไทย' },
  },
  experience: [
    {
      period: { en: '2020 - 2025', th: 'พ.ศ. 2563 - 2568' },
      title: { en: 'Front-end Developer', th: 'นักพัฒนาฟรอนต์เอนด์' },
      company: { en: 'Tigon Tech Co.,LTD', th: 'บริษัท ไทกอน เทค จำกัด' },
      description: [
        { en: 'Developed and designed websites using Vue.js, focusing on performance, scalability, and user-centered experiences.', th: 'พัฒนาและออกแบบเว็บไซต์ด้วย Vue.js โดยเน้นที่ประสิทธิภาพ ความสามารถในการขยายขนาด และประสบการณ์ที่เน้นผู้ใช้เป็นศูนย์กลาง' },
        { en: 'Created games using Unity and Cocos Creator, with an emphasis on developing new features and improving overall gameplay experience.', th: 'สร้างเกมโดยใช้ Unity และ Cocos Creator โดยเน้นที่การพัฒนาฟีเจอร์ใหม่ๆ และปรับปรุงประสบการณ์การเล่นเกมโดยรวม' },
        { en: 'Researched and applied new technologies and techniques to enhance team productivity and deliver higher-quality creative outcomes.', th: 'วิจัยและประยุกต์ใช้เทคโนโลยีและเทคนิคใหม่ๆ เพื่อเพิ่มประสิทธิผลของทีมงานและส่งมอบผลงานสร้างสรรค์ที่มีคุณภาพดียิ่งขึ้น' },
        { en: 'Mentored and supported junior team members, helping them build technical skills, confidence, and effectiveness in their roles.', th: 'เป็นพี่เลี้ยงและให้การสนับสนุนสมาชิกทีมรุ่นน้อง ช่วยสร้างทักษะทางเทคนิค ความมั่นใจ และความมีประสิทธิผลในบทบาทหน้าที่ของตน' },
      ],
    },
    {
      period: { en: '2018 - 2020', th: 'พ.ศ. 2561 - 2563' },
      title: { en: 'Front-end Developer', th: 'นักพัฒนาฟรอนต์เอนด์' },
      company: { en: 'Outsourcify Co.,LTD', th: 'บริษัท เอาท์ซอร์สซิฟาย จำกัด' },
      description: [
        { en: 'Developed high-quality e-learning websites for sales staff of a French luxury brand, aimed at enhancing product knowledge and sales effectiveness.', th: 'พัฒนาเว็บไซต์อีเลิร์นนิงคุณภาพสูงสำหรับพนักงานขายของแบรนด์หรูจากฝรั่งเศส เพื่อเพิ่มพูนความรู้เกี่ยวกับผลิตภัณฑ์และประสิทธิภาพงานขาย' },
        { en: 'Evaluated and planned website development strategically by analyzing client requirements and aligning with appropriate marketing objectives.', th: 'ประเมินและวางแผนการพัฒนาเว็บไซต์ในเชิงกลยุทธ์ โดยวิเคราะห์ความต้องการของลูกค้าและปรับให้เข้ากับวัตถุประสงค์ทางการตลาดที่เหมาะสม' },
        { en: 'Coordinated with clients from France to ensure all project deliverables met expectations and were executed accurately without errors.', th: 'ประสานงานกับลูกค้าชาวฝรั่งเศสเพื่อให้มั่นใจว่าผลการดำเนินงานของโปรเจกต์ตรงตามความคาดหวัง และดำเนินการได้อย่างแม่นยำไร้ข้อผิดพลาด' },
      ],
    },
  ],
  education: [
    {
      period: { en: '2017', th: 'พ.ศ. 2560' },
      degree: { en: 'BACHELOR DEGREE', th: 'ปริญญาตรี' },
      institution: { en: 'Chiang Rai Rajabhat University', th: 'มหาวิทยาลัยราชภัฏเชียงราย' },
      description: { en: 'Computer Science', th: 'วิทยาการคอมพิวเตอร์' },
    },
    {
      period: { en: '2013', th: 'พ.ศ. 2556' },
      degree: { en: 'HIGH SCHOOL DIPLOMA', th: 'มัธยมศึกษาตอนปลาย' },
      institution: { en: 'Maesai prasitsart School', th: 'โรงเรียนแม่สายประสิทธิ์ศาสตร์' },
      description: { en: 'English - Social Program', th: 'ศิลป์ - ภาษาอังกฤษ สังคม' },
    },
  ],
  skills: [
    {
      category: { en: 'Frontend Frameworks', th: 'ระบบหน้าบ้าน (Frontend)' },
      items: [
        { en: 'React.js', th: 'React.js' },
        { en: 'Next.js', th: 'Next.js' },
        { en: 'Vue.js', th: 'Vue.js' },
        { en: 'Tailwind CSS', th: 'Tailwind CSS' },
        { en: 'Bootstrap', th: 'Bootstrap' },
      ],
    },
    {
      category: { en: 'Backend Frameworks', th: 'ระบบหลังบ้าน (Backend)' },
      items: [
        { en: 'Nest.js', th: 'Nest.js' },
        { en: 'Node.js', th: 'Node.js' },
      ],
    },
    {
      category: { en: 'Programming Languages', th: 'ภาษาโปรแกรม' },
      items: [
        { en: 'JavaScript', th: 'JavaScript' },
        { en: 'TypeScript', th: 'TypeScript' },
        { en: 'HTML5', th: 'HTML5' },
        { en: 'CSS3', th: 'CSS3' },
        { en: 'C#', th: 'C#' },
      ],
    },
    {
      category: { en: 'Other Tools', th: 'เครื่องมืออื่นๆ' },
      items: [
        { en: 'Git', th: 'Git' },
        { en: 'Docker', th: 'Docker' },
        { en: 'MongoDB', th: 'MongoDB' },
        { en: 'Unity', th: 'Unity' },
        { en: 'Cocos Creator', th: 'Cocos Creator' },
        { en: 'Figma', th: 'Figma' },
      ],
    },
  ],
  projects: [
    {
      title: { en: 'Mini Zoo Merge', th: 'เกมมือถือจับคู่สัตว์น่ารัก' },
      description: { en: 'A cute animals mobile game. Drop same animal to merge and get score.', th: 'เกมมือถือสัตว์น่ารัก ทิ้งสัตว์ชนิดเดียวกันให้รวมร่างกันเพื่อรับคะแนน' },
      techStack: ['Unity', 'C#'],
      link: 'https://play.google.com/store/apps/details?id=com.tigongame.minizoomerge&hl=th',
      github: '#',
    },
    {
      title: { en: 'Poker Dices 3D', th: 'เต๋าโกหก' },
      description: { en: 'Dice game play with your friend enjoy in party.', th: 'เกมลูกเต๋าสำหรับเล่นสนุกกับเพื่อนๆ ในงานปาร์ตี้' },
      techStack: ['Unity', 'C#'],
      link: 'https://play.google.com/store/apps/details?id=com.tigongame.pokerdices2&hl=th',
      github: '#',
    },
    {
      title: { en: 'Old CV with React js', th: 'CV แบบเดิม สร้างโดย React js' },
      description: { en: 'My personal portfolio and CV built using React.', th: 'เว็บไซต์เรซูเม่และพอร์ตโฟลิโอส่วนตัวที่สร้างด้วย React' },
      techStack: ['React js', 'JavaScript', 'CSS'],
      link: 'https://tr-pong.github.io/ReactCV/',
      github: 'https://github.com/tr-pong/ReactCV',
    },
  ],
};

async function seedDB() {
  try {
    const { uri, options } = getMongoConfig();
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB.');

    // 1. Create User
    await UserModel.deleteMany({});
    const user = new UserModel({
      username: 'tr.pong',
      password: 'Tr0882283284!', // Will be hashed by pre-save hook
    });
    await user.save();
    console.log('Admin user created: tr.pong');

    // 2. Seed Individual Collections
    await ProfileModel.deleteMany({});
    const profile = new ProfileModel(seedData.profile);
    await profile.save();
    console.log('Profile seeded.');

    await ExperienceModel.deleteMany({});
    await ExperienceModel.insertMany(seedData.experience);
    console.log('Experience seeded.');

    await EducationModel.deleteMany({});
    await EducationModel.insertMany(seedData.education);
    console.log('Education seeded.');

    await SkillModel.deleteMany({});
    await SkillModel.insertMany(seedData.skills);
    console.log('Skills seeded.');

    await ProjectModel.deleteMany({});
    await ProjectModel.insertMany(seedData.projects);
    console.log('Projects seeded.');

    // Cleanup legacy if desired
    // await CVDataModel.deleteMany({});

    console.log('Successfully seeded all collections.');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedDB();
