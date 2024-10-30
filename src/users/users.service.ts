import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/common/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserResponse } from 'src/common/interface/users';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.usersModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const existingUser = await this.usersModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // Replace the plain password with the hashed password
    const createdUser = new this.usersModel({
      ...createUserDto,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const savedUser = await createdUser.save();
    return {
      message: 'created User successfully',
    };
  }

  async findOne(id: string): Promise<User> {
    const result = await this.usersModel.findOne({ _id: id }).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const resData = await this.usersModel.findById(id).exec();
    return resData;
  }

  async findByUser(username: string): Promise<UserDocument> {
    return await this.usersModel.findOne({ username: username }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
