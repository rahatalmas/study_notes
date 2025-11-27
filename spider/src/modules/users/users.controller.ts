import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto} from './dto/user.dto';
import { UserSkillNExpRemoveDto } from './dto/user.remove.skill.n.exp.dto';
import { UserSkillNExpUpdateDto } from './dto/user.update.skill.n.exp.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  @Patch('update/skill/replace')
  async updateSkillOrExperience(@Body() data:UserSkillNExpUpdateDto){
    return this.usersService.updateSkillOrExperience(data)
  }

  @Delete('remove/skill')
  removeSkill(@Body() rmSkill: UserSkillNExpRemoveDto){
     return this.usersService.removeSkill(rmSkill)
  }

  @Delete('remove/experience')
  removeExperience(@Body() rmExp: UserSkillNExpRemoveDto){
     return this.usersService.removeExperience(rmExp)
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


}
