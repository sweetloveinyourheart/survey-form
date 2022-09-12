import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, MoreThan, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create.dto';
import { UserRoles } from './entities/role.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUser } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserRoles) private userRoleRepository: Repository<UserRoles>
    ) { }

    public async createUser(user: CreateUserDTO): Promise<User> {
        const { roles, ...data } = user

        const isExist = await this.userRepository.findOneBy({ phone: data.phone })
        if(isExist) throw new BadRequestException('User already exists !')

        const userRoles = await this.userRoleRepository.findBy({ id: In(roles) })
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(data.password, salt)

        const newUser = await this.userRepository.create({
            ...data,
            password: hashedPassword,
            roles: userRoles
        })
        const result = await this.userRepository.save(newUser)

        return result
    }

    public async getUserRoles(): Promise<UserRoles[]> {
        return await this.userRoleRepository.find()
    }

    public async getUserList(): Promise<User[]> {
        return await this.userRepository.find()
    }

    public async getUserByPhone(phone: string): Promise<User> {
        return await this.userRepository.findOneBy({ phone })
    }

    public async getProfile(user: AuthenticatedUser) {
        return await this.userRepository.findOne({
            where: {
                phone: user.phone   
            },
            select: ['id', 'address', 'birthday', 'email', 'name', 'phone', 'roles'],
            relations: ['roles']
        })
    }

    public async getAll(cursor?: string): Promise<{ users: User[], count: number }> {
        return {
            users: await this.userRepository.find({
                select: ['id', 'address', 'birthday', 'email', 'name', 'phone'],
                relations: ['roles'],
                where: [{
                    id: MoreThan(Number(cursor || 0))
                }],
                take: 10
            }),
            count: await this.userRepository.count()
        }
    }

    public async findUsers(name: string): Promise<User[]> {
        return await this.userRepository.findBy({ name: Like(`%${name}%`) })
    }
}
