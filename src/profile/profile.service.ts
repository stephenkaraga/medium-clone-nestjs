import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ArticleEntity } from '../article/article.entity';
import { CreateArticleDto } from '../article//dto/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ArticleResponseInterface } from '../article//types/articleResponse.interface';
import slugify from 'slugify';
import { ArticlesResponseInterface } from '../article/types/articlesResponseInterface';
import { ProfileType } from './types/profile.type';
import { ProfileResponseInterface } from './types/profileResponse.interface';
import { FollowEntity } from './follow.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(FollowEntity)
        private readonly followRepository: Repository<FollowEntity>,
    ) {}

    async getProfile(currentUserId: number, profileUsername: string): Promise<ProfileType> {
        const user = await this.userRepository.findOne({
            username: profileUsername
        });

        if (!user) {
            throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
        };

        const follow = await this.followRepository.findOne({
            followerId: currentUserId,
            followingId: user.id,
          });

        
        return { ...user, following: Boolean(follow) }
    }

    async followProfile(currentUserId: number, profileUsername: string): Promise<ProfileType> {
        const user = await this.userRepository.findOne({
            username: profileUsername
        });

        if (!user) {
            throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
        };

        if (currentUserId === user.id) {
            throw new HttpException('Follower and Following cannot be equal', HttpStatus.BAD_REQUEST)
        }

        const follow = await this.followRepository.findOne({
            followerId: currentUserId,
            followingId: user.id
        })

        if (!follow) {
            const followToCreate = new FollowEntity();
            followToCreate.followerId = currentUserId;
            followToCreate.followingId = user.id;
            await this.followRepository.save(followToCreate);
        }

        return { ...user, following: true}
    }

    async unfollowProfile(currentUserId: number, profileUsername: string): Promise<ProfileType> {
        const user = await this.userRepository.findOne({
            username: profileUsername
        });

        if (!user) {
            throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
        };

        if (currentUserId === user.id) {
            throw new HttpException('Follower and Following cannot be equal', HttpStatus.BAD_REQUEST)
        }

        await this.followRepository.delete({
            followerId: currentUserId,
            followingId: user.id
        })

        // const follow = await this.followRepository.findOne({
        //     followerId: currentUserId,
        //     followingId: user.id
        // })

        // if (!follow) {
        //     const followToCreate = new FollowEntity();
        //     followToCreate.followerId = currentUserId;
        //     followToCreate.followingId = user.id;
        //     await this.followRepository.save(followToCreate);
        // }

        return { ...user, following: false}
    }

    buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
        delete profile.email;
        return { profile };
      }
}