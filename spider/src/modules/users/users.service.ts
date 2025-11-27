import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { UpdateUserDto } from './dto/user.dto';
import { ResponseInterface } from '../../common/interface/response.interface';
import { UserSkillNExpRemoveDto } from './dto/user.remove.skill.n.exp.dto';
import { UserSkillNExpUpdateDto } from './dto/user.update.skill.n.exp.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepo,
  ){}

  async findAll() {
    let data = await this.userRepo.findAll()
    return new ResponseInterface({message:"all users",data:data})
  }

  async findOne(id: string) {
    let user = await this.userRepo.finfById(id)
    return new ResponseInterface({message:`user with id: ${id}`,data:user})
  }

  async update(id: string, data: UpdateUserDto) {
    let res = await this.userRepo.update(id,data)
    return new ResponseInterface({message:`user with id: ${id} updated`,data:res})
  }

  async updateSkillOrExperience(data:UserSkillNExpUpdateDto){
    if (!["skills", "experience"].includes(data.qType)) {
        throw new BadRequestException("Invalid qType, Must be skill or experience");
    }
    let res = await this.userRepo.replaceSkillOrExperience(data.uId,data.qType,data.key,data.value)
    if(res.modifiedCount==0){
      throw new NotFoundException("skill doesn't exist to profile")
    }
    return new ResponseInterface({message:"Skill replaced with new value",data:res})
  }

  async removeExperience(rmExp: UserSkillNExpRemoveDto){
    return this.userRepo.removeExperiece(rmExp.uId,rmExp.key)
  }

  async removeSkill(rmSkill: UserSkillNExpRemoveDto){
    return this.userRepo.removeSkill(rmSkill.uId,rmSkill.key)
  }

  remove(id: string) {
    
  }
}
