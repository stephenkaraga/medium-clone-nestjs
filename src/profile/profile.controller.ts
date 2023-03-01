import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { ProfileService } from './profile.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { User } from "@app/user/decorators/user.decorator";
import { UserEntity } from '../user/user.entity';
import { ProfileResponseInterface } from "./types/profileResponse.interface";
import { ProfileType } from "./types/profile.type";

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get(':username')
    async getProfile(@User('id') currentUserId: number, @Param('username') profileUsername: string): Promise<ProfileResponseInterface> {
        const profile = await this.profileService.getProfile(currentUserId, profileUsername)
        return await this.profileService.buildProfileResponse(profile);
    }

    @Post(':username/follow')
    @UseGuards(AuthGuard)
    async followProfile(@User('id') currentUserId: number, @Param('username') profileUsername: string): Promise<ProfileResponseInterface> {
        const profile = await this.profileService.followProfile(currentUserId, profileUsername)
        return await this.profileService.buildProfileResponse(profile);
    }

    @Delete(':username/follow')
    @UseGuards(AuthGuard)
    async unfollowProfile(@User('id') currentUserId: number, @Param('username') profileUsername: string): Promise<ProfileResponseInterface> {
        const profile = await this.profileService.unfollowProfile(currentUserId, profileUsername)
        return await this.profileService.buildProfileResponse(profile);
    }

    

}