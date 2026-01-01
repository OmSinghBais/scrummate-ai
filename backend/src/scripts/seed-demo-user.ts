import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  const userService = app.get(UserService);

  const demoEmail = 'demo@scrummate.ai';
  const demoPassword = 'Demo123!@#';
  const demoName = 'Demo User';

  try {
    // Check if demo user already exists
    const existingUser = await userRepository.findOne({ where: { email: demoEmail } });
    
    if (existingUser) {
      console.log('✅ Demo user already exists!');
      console.log('📧 Email:', demoEmail);
      console.log('🔑 Password:', demoPassword);
      console.log('\nYou can use these credentials to log in.');
    } else {
      // Create demo user
      const hashedPassword = await User.hashPassword(demoPassword);
      const user = userRepository.create({
        email: demoEmail,
        password: hashedPassword,
        name: demoName,
      });

      await userRepository.save(user);
      
      console.log('✅ Demo user created successfully!');
      console.log('\n📋 Login Credentials:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:    ', demoEmail);
      console.log('🔑 Password: ', demoPassword);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n💡 You can now use these credentials to log in.');
    }
  } catch (error) {
    console.error('❌ Error creating demo user:', error);
  } finally {
    await app.close();
  }
}

bootstrap();

