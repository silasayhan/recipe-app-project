import { AuthService } from './auth.service';
import { UserRole } from '../users/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(body: {
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            role: UserRole;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            role: UserRole;
        };
    }>;
}
