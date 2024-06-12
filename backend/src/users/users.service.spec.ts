import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService, UserFindOne } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserRole } from './enums/user-role.enum';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

const mockUserRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    it('should create a new user', async () => {
      const dto: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
        birthDate: new Date(),
        isEmployee: false,
        role: UserRole.USER,
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(dto);
      mockUserRepository.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.createOne(dto);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: dto.email } });
      expect(mockUserRepository.create).toHaveBeenCalledWith(dto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, ...dto });
    });

    it('should throw an error if user already exists', async () => {
      const dto: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
        birthDate: new Date(),
        isEmployee: false,
        role: UserRole.USER,
      };

      mockUserRepository.findOne.mockResolvedValue(dto);

      await expect(service.createOne(dto)).rejects.toThrow(
        new HttpException('Użytkownik o podanym adresie email istnieje.', HttpStatus.CONFLICT),
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, firstName: 'Test', lastName: 'User', email: 'test@example.com' }];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.getAllUsers();

      expect(mockUserRepository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findDriver', () => {
    it('should return an array of drivers', async () => {
      const drivers = [{ id: 1, firstName: 'Driver', lastName: 'One', isEmployee: true }];
      mockUserRepository.find.mockResolvedValue(drivers);

      const result = await service.findDriver();

      expect(mockUserRepository.find).toHaveBeenCalledWith({ where: { isEmployee: true } });
      expect(result).toEqual(drivers);
    });
  });

  describe('getDriver', () => {
    it('should return a driver by id', async () => {
      const driver = { id: 1, firstName: 'Driver', lastName: 'One', isEmployee: true };
      mockUserRepository.findOne.mockResolvedValue(driver);

      const result = await service.getDriver(1);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1, isEmployee: true } });
      expect(result).toEqual(driver);
    });

    it('should throw an error if driver is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getDriver(1)).rejects.toThrow(
        new HttpException('Nie znaleziono kierowcy o podanym numerze ID.', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('getOneUser', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, firstName: 'Test', lastName: 'User' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.getOneUser(1);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getOneUser(1)).rejects.toThrow(
        new HttpException('Użytkownik o podanym id nie istnieje', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('updateOne', () => {
    it('should update a user by id without changing password', async () => {
      const dto: EditUserDto = {
        firstName: 'Updated',
        lastName: 'User',
        email: 'updated@example.com',
        password: null,
        birthDate: new Date(),
        isEmployee: false,
        role: UserRole.USER,
      };
      const updatedUser = { id: 1, ...dto };
      mockUserRepository.findOne.mockResolvedValue(updatedUser);
      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await service.updateOne(1, dto);

      expect(mockUserRepository.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual({ updateUser: updatedUser });
    });

    it('should update a user by id with new password', async () => {
      const dto: EditUserDto = {
        firstName: 'Updated',
        lastName: 'User',
        email: 'updated@example.com',
        password: 'newpassword',
        birthDate: new Date(),
        isEmployee: false,
        role: UserRole.USER,
      };
      const hashedPassword = await bcrypt.hash('newpassword', 10);
      const updatedUser = { id: 1, ...dto, password: hashedPassword };
      mockUserRepository.findOne.mockResolvedValue(updatedUser);
      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await service.updateOne(1, dto);

      expect(mockUserRepository.update).toHaveBeenCalledWith(1, {
        ...dto,
        password: hashedPassword,
      });
      expect(result).toEqual({
        updateUser: updatedUser,
        data: updatedUser,
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete a user by id', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.deleteOne(1).toPromise();

      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('getOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, firstName: 'Test', lastName: 'User' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.getOne(1);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getOne(1)).rejects.toThrow(new NotFoundException('Użytkownik nie istnieje'));
    });
  });

  describe('findOne', () => {
    it('should return a user by given criteria', async () => {
      const criteria: UserFindOne = { email: 'test@example.com' };
      const user = { id: 1, email: 'test@example.com', password: 'password' };
      mockUserRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(criteria);

      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith(criteria);
      expect(result).toEqual(user);
    });
  });
});
