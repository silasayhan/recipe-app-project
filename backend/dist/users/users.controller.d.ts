import { UsersService } from './users.service';
import { UserRole } from './user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUser(id: number): Promise<{
        email: string;
        role: UserRole;
    }>;
    getAllUsers(): Promise<import("./user.entity").User[]>;
}
