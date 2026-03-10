import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';
import { UsersService } from '../users/users.service';

export const FeatureFlagGuard = (flagKey: string) => {
  @Injectable()
  class Guard implements CanActivate {
    constructor(
      public readonly featureFlagsService: FeatureFlagsService,
      public readonly usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user as { userId?: string; username?: string } | null;

      if (!user?.userId) {
        throw new ForbiddenException(
          'You are not authorized to access this resource',
        );
      }

      const fullUser = await this.usersService.findOneByIdWithGroup(user.userId);
      const groupId = fullUser?.group?.id;

      return this.featureFlagsService.isEnabled(flagKey, {
        userId: user.userId,
        groupId,
      });
    }
  }
  return Guard;
};
