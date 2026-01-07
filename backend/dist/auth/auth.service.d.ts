import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(email: string, password: string, role?: UserRole): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            role: UserRole;
        };
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            role: UserRole;
        };
    }>;
}
