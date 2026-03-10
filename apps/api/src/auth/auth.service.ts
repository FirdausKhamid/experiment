import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { FeatureFlagsService } from '../feature-flags/feature-flags.service';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private featureFlagsService: FeatureFlagsService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<
    import('../entities/user.entity').User,
    'passwordHash'
  > | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const fullUser = await this.usersService.findOneByIdWithGroup(user.id);
    const features = await this.featureFlagsService.getEnabledFeatureKeysForUser({
      userId: user.id,
      groupId: fullUser?.group?.id,
    });
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      features,
    } as AuthResponseDto;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.usersService.create(registerDto);
    const fullUser = await this.usersService.findOneByIdWithGroup(user.id);
    const features = await this.featureFlagsService.getEnabledFeatureKeysForUser({
      userId: user.id,
      groupId: fullUser?.group?.id,
    });
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      features,
    } as AuthResponseDto;
  }
}
