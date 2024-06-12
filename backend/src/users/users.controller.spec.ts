import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {EditUserDto} from './dto/edit-user.dto';
import {UserRole} from "./enums/user-role.enum";

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserService = {
    createOne: jest.fn(dto => ({
      id: Date.now(),
      ...dto,
    })),
    getAllUsers: jest.fn(() => [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', isEmployee: false, role: "user", birthDate: new Date() },
    ]),
    findDriver: jest.fn(() => [
      { id: 2, firstName: 'Driver', lastName: 'One', email: 'driver@example.com', isEmployee: true, role: "user", birthDate: new Date() },
    ]),
    getOneUser: jest.fn(id => ({
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      isEmployee: true,
      role: UserRole.USER,
      birthDate: new Date(),
    })),
    updateOne: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    deleteOne: jest.fn(id => ({
      id,
      deleted: true,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      isEmployee: false,
      role: UserRole.USER,
      birthDate: new Date('1990-01-01'),
    };
    expect(await controller.addUser(dto)).toEqual({
      message: 'Użytkownik stworzony pomyślnie',
      user: {
        id: expect.any(Number),
        ...dto,
      },
    });
    expect(mockUserService.createOne).toHaveBeenCalledWith(dto);
  });

  it('should get all users', async () => {
    expect(await controller.getUsers()).toEqual([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        isEmployee: false,
        role: 'user',
        birthDate: new Date(),
      },
    ]);
    expect(mockUserService.getAllUsers).toHaveBeenCalled();
  });

  it('should get all drivers', async () => {
    expect(await controller.getDriver()).toEqual([
      {
        id: 2,
        firstName: 'Driver',
        lastName: 'One',
        email: 'driver@example.com',
        isEmployee: true,
        role: 'user',
        birthDate: new Date(),
      },
    ]);
    expect(mockUserService.findDriver).toHaveBeenCalled();
  });

  it('should get one user', async () => {
    expect(await controller.getUser(1)).toEqual({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      isEmployee: true,
      role: 'user',
      birthDate: new Date(),
    });
    expect(mockUserService.getOneUser).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const dto: EditUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'newpassword123',
      isEmployee: true,
      birthDate: new Date(),
      role: UserRole.USER
    };
    expect(controller.updateOne(1, dto)).toEqual({
      message: 'Użytkownik edytowany pomyślnie',
      user: {
        id: 1,
        ...dto,
      },
    });
    expect(mockUserService.updateOne).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a user', async () => {
    controller.removeUser(1);
    expect(mockUserService.deleteOne).toHaveBeenCalledWith(1);
  });
});
