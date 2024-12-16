import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//1) Importamos:  
//Vamos a importar el decorador @InjectModel
import { InjectModel } from '@nestjs/mongoose';

//Importamos ahora el Model de Mongoose: 
import { Model } from "mongoose"; 

//Importamos el User y userSchema: 
import { User, userSchema, UsersDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
  //1) Creamos el constructor: hacemos la inyección del modelo del usuario. 
  constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
