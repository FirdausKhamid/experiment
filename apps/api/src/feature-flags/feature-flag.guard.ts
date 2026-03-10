import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FEATURE_FLAG_KEY } from './feature-flag.decorator';
import { FeatureFlagsService } from './feature-flags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly featureFlagsService: FeatureFlagsService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const flagKey = this.reflector.get<string>(
      FEATURE_FLAG_KEY,
      context.getHandler(),
    );

    if (!flagKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as { userId?: string; username?: string } | null;

    if (!user?.userId) {
      throw new UnauthorizedException('Missing authenticated user for feature check');
    }

    const fullUser = await this.usersService.findOneByIdWithGroup(user.userId);
    const groupId = fullUser?.group?.id;

    return this.featureFlagsService.isEnabled(flagKey, {
      userId: user.userId,
      groupId,
    });
  }
}

