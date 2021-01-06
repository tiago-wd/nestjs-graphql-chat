import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { MessageModule } from './message/message.module';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://chat-user-test:vumgqcCfnrm3Any@cluster0.25grh.mongodb.net/test?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
    }),
    UserModule,
    GroupModule,
    MessageModule,
  ],
  providers: [{ provide: PubSub, useValue: new PubSub() }],
})
export class AppModule {}
