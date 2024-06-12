import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { User } from './entities/user.entity';
import { UserI } from './interfaces/user.interface';

export interface UserFindOne {
    id?: number;
    email?: string;
}

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async createOne(dto: CreateUserDto): Promise<any> {
        const userExist = await this.userRepository.findOne({
            where: {
                email: dto.email
            }
        });

        if (userExist) {
            throw new HttpException("Użytkownik o podanym adresie email istnieje.", HttpStatus.CONFLICT);
            //throw new BadRequestException('Użytkownik o podanym adresie email istnieje.');
        }

        const newUser = this.userRepository.create(dto);
        const user =  await this.userRepository.save(newUser);

        delete user.password;
        return user
    }

    // Funkcja zwracająca tablice wszystkich użytkowników
    async getAllUsers(): Promise<UserI[]> {

        const data = await this.userRepository.find();
        return data;
    }

    async findDriver() {
        return await this.userRepository.find({
            where: {
                isEmployee: true,
            }
        });
    }

    async getDriver(id: number) {
        const data = await this.userRepository.findOne({
            where: {
                id: id,
                isEmployee: true
            }
        });
        if (!data) {
            throw new HttpException('Nie znaleziono kierowcy o podanym numerze ID.', HttpStatus.NOT_FOUND);
        }

        return data;
    }

    async getOneUser(id: number): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new HttpException("Użytkownik o podanym id nie istnieje", HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async updateOne(id: number, user: EditUserDto) {

        if(user.password == null) {
            delete user.password;
            const updateUser = await this.userRepository.update(id, user);
            return {
                updateUser
            }
        } else {
            user.password = await hash(user.password, 10);
            const updateUser = await this.userRepository.update(id, user);
            const data = await this.userRepository.findOne({ where: { id: id }});
            return {
                updateUser, data
            }
        }
        /*
        user.password = await hash(user.password, 10);
        const updateUser = await this.userRepository.update(id, user);
        const data = await this.userRepository.findOne(id);
        */

    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    async getOne(id: number, userEntity?: User) {
        const user = await this.userRepository
          .findOne({ where: { id: id }})
          .then(u => (!userEntity ? u : !!u && userEntity.id === u.id ? u : null));

        if (!user)
          throw new NotFoundException('Użytkownik nie istnieje');

        return user;
      }

    async findOne(data: UserFindOne) {
        return await this.userRepository
          .createQueryBuilder('user')
          .where(data)
          .addSelect('user.password')
          .getOne();
    }


}
