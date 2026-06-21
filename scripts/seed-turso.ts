import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../src/db/schema';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });

async function seed() {
  console.log('🌱 Seeding Turso database...');
  
  try {
    // Insert profile
    console.log('📝 Creating profile...');
    await db.insert(schema.profile).values({
      id: 'prof-' + Date.now(),
      name: 'Daniel Sinambela',
      email: 'daniel@example.com',
      phone: '+62 812 3456 7890',
      location: 'Indonesia',
      bio: 'Full Stack Developer & Tech Enthusiast',
      description: 'Passionate about building scalable web applications with modern technologies. Experienced in React, Next.js, and Node.js.',
      githubUrl: 'https://github.com/dannel07',
      linkedinUrl: 'https://linkedin.com/in/daniel-sinambela',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    // Insert tech stacks
    console.log('⚙️ Creating tech stacks...');
    const techStacksData = [
      // Frontend
      { name: 'React', category: 'Frontend', proficiency: 90 },
      { name: 'Next.js', category: 'Frontend', proficiency: 85 },
      { name: 'TypeScript', category: 'Frontend', proficiency: 85 },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90 },
      { name: 'JavaScript', category: 'Frontend', proficiency: 90 },
      { name: 'HTML/CSS', category: 'Frontend', proficiency: 95 },
      
      // Backend
      { name: 'Node.js', category: 'Backend', proficiency: 80 },
      { name: 'Express.js', category: 'Backend', proficiency: 75 },
      { name: 'Next.js API', category: 'Backend', proficiency: 80 },
      { name: 'REST API', category: 'Backend', proficiency: 85 },
      
      // Database
      { name: 'PostgreSQL', category: 'Database', proficiency: 75 },
      { name: 'SQLite', category: 'Database', proficiency: 80 },
      { name: 'MongoDB', category: 'Database', proficiency: 70 },
      { name: 'Prisma', category: 'Database', proficiency: 75 },
      { name: 'Drizzle ORM', category: 'Database', proficiency: 80 },
      
      // Tools
      { name: 'Git', category: 'Tools', proficiency: 85 },
      { name: 'GitHub', category: 'Tools', proficiency: 85 },
      { name: 'VS Code', category: 'Tools', proficiency: 90 },
      { name: 'Postman', category: 'Tools', proficiency: 80 },
      { name: 'Figma', category: 'Tools', proficiency: 70 },
    ];
    
    const techStackIds: string[] = [];
    for (const tech of techStacksData) {
      const id = 'ts-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      techStackIds.push(id);
      await db.insert(schema.techStacks).values({
        id,
        name: tech.name,
        category: tech.category,
        proficiency: tech.proficiency,
        order: 0,
        createdAt: Date.now(),
      });
    }
    
    // Insert projects
    console.log('📂 Creating projects...');
    const projects = [
      {
        id: 'proj-' + Date.now() + '-1',
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce application with cart, checkout, and payment integration',
        longDescription: 'A complete e-commerce solution built with Next.js and PostgreSQL. Features include product catalog, shopping cart, user authentication, order management, and Stripe payment integration.',
        status: 'completed',
        featured: 1,
        githubUrl: 'https://github.com/dannel07/ecommerce',
        demoUrl: 'https://ecommerce-demo.vercel.app',
        startDate: '2024-01',
        endDate: '2024-03',
        techStacks: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      },
      {
        id: 'proj-' + Date.now() + '-2',
        title: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates',
        longDescription: 'A Trello-like task management application with drag-and-drop functionality, real-time collaboration, and team workspaces.',
        status: 'completed',
        featured: 1,
        githubUrl: 'https://github.com/dannel07/task-manager',
        demoUrl: 'https://tasks-demo.vercel.app',
        startDate: '2023-10',
        endDate: '2023-12',
        techStacks: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      },
      {
        id: 'proj-' + Date.now() + '-3',
        title: 'Weather Dashboard',
        description: 'Real-time weather information with beautiful visualizations',
        longDescription: 'Weather dashboard showing current conditions, forecasts, and historical data with interactive charts and maps.',
        status: 'completed',
        featured: 0,
        githubUrl: 'https://github.com/dannel07/weather-app',
        demoUrl: 'https://weather-demo.vercel.app',
        startDate: '2023-08',
        endDate: '2023-09',
        techStacks: ['React', 'TypeScript', 'REST API'],
      },
      {
        id: 'proj-' + Date.now() + '-4',
        title: 'Blog Platform',
        description: 'Modern blog platform with markdown support and SEO optimization',
        longDescription: 'A fast and SEO-friendly blog platform built with Next.js. Features include markdown editing, code syntax highlighting, tags, and full-text search.',
        status: 'completed',
        featured: 0,
        githubUrl: 'https://github.com/dannel07/blog-platform',
        demoUrl: 'https://blog-demo.vercel.app',
        startDate: '2023-06',
        endDate: '2023-07',
        techStacks: ['Next.js', 'TypeScript', 'SQLite', 'Tailwind CSS'],
      },
    ];
    
    for (const project of projects) {
      await db.insert(schema.projects).values({
        id: project.id,
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        status: project.status,
        featured: project.featured,
        githubUrl: project.githubUrl,
        demoUrl: project.demoUrl,
        startDate: project.startDate,
        endDate: project.endDate,
        order: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
    
    // Insert experiences
    console.log('💼 Creating experiences...');
    const experiences = [
      {
        title: 'Frontend Developer Intern',
        company: 'Tech Startup Indonesia',
        location: 'Jakarta, Indonesia',
        type: 'internship',
        startDate: '2024-01',
        endDate: null,
        isCurrently: 1,
        description: 'Developing and maintaining web applications using React and Next.js. Collaborating with design and backend teams to deliver high-quality features.',
      },
      {
        title: 'Web Developer',
        company: 'Freelance',
        location: 'Remote',
        type: 'freelance',
        startDate: '2023-06',
        endDate: null,
        isCurrently: 1,
        description: 'Building custom websites and web applications for various clients. Specializing in React, Next.js, and modern web technologies.',
      },
      {
        title: 'IT Committee Member',
        company: 'University Tech Community',
        location: 'Indonesia',
        type: 'organization',
        startDate: '2023-01',
        endDate: '2023-12',
        isCurrently: 0,
        description: 'Organized tech workshops and hackathons. Mentored junior students in web development.',
      },
    ];
    
    for (const exp of experiences) {
      await db.insert(schema.experiences).values({
        id: 'exp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        title: exp.title,
        company: exp.company,
        location: exp.location,
        type: exp.type,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrently: exp.isCurrently,
        description: exp.description,
        order: 0,
        createdAt: Date.now(),
      });
    }
    
    console.log('✅ Seeding complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log('  - 1 Profile');
    console.log('  - ' + techStacksData.length + ' Tech Stacks');
    console.log('  - ' + projects.length + ' Projects');
    console.log('  - ' + experiences.length + ' Experiences');
    console.log('');
    console.log('🎉 Database ready to use!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
