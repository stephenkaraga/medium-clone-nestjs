import { Module } from "@nestjs/common";
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { UserEntity } from '../user/user.entity';
import { FollowEntity } from './follow.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProfileEntity, FollowEntity, UserEntity])],
controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule {}