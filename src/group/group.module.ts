import { UserService } from './../user/user.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './models/group.model';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { UserModule } from './../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [GroupService, GroupResolver],
  exports: [GroupService],
})
export class GroupModule {}
