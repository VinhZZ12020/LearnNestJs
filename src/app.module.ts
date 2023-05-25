import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostModule,
    // AccountModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://admin:120203@dacs3.bpf6hma.mongodb.net/',
      {
        dbName: 'nestjs',
      },
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
