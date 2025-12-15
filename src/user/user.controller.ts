import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateEducationDto } from './dto/create-user-education';
import { CreateSkillsDto } from './dto/create-user-skill.dto';
import { CommonQueryDto } from '../common/dto/common-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  findAll(@Query() query: CommonQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // education
  @Post('education/create')
  async create(@Body() createEducationDto: CreateEducationDto, @Request() req) {
    const userId = req.user.id;
    console.log('userId', req.user);
    const data = await this.userService.createEducation(
      createEducationDto,
      userId,
    );
    return {
      data,
    };
  }

  @Get('education/list')
  async findAllEducation(@Query() query: CommonQueryDto, @Request() req) {
    const user = req.user;
    return this.userService.findAllEducations(query, user);
  }

  @Get('education/:id/detail')
  async findOneEducation(@Param('id') id: string) {
    const data = await this.userService.findOneEducation(id);
    return { data };
  }

  @Patch('education/:id/update')
  async updateEducation(
    @Param('id') id: string,
    @Body() updateEducationDto: CreateEducationDto,
  ) {
    return this.userService.updateEducation(id, updateEducationDto);
  }

  @Delete('education/:id/delete')
  async removeEducation(@Param('id') id: string) {
    return this.userService.removeEducation(id);
  }

  // user skills
  @Post('skill/create')
  async createSkill(@Body() createSkillDto: CreateSkillsDto[], @Request() req) {
    const data = await this.userService.createSkills(createSkillDto, req.user.id);
    return {
      data,
    };
  }

  @Get('skill/list')
  async findAllSkill(@Query() query: CommonQueryDto, @Request() req) {
    const user = req.user;
    const data = await this.userService.getAllSkills(query, user); 
    return {data}
  }   
    
  @Delete('skill/:id/delete')
  async removeSkill(@Param('id') id: string) {
    return this.userService.removeSkill(id);
  }


}
