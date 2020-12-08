import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://chat-user-test:<password>@cluster0.25grh.mongodb.net/<dbname>?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
})
export class AppModule {}
