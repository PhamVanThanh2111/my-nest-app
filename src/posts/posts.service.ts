import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreatePostDto): Promise<Post> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const post = this.postRepo.create({
      title: dto.title,
      content: dto.content,
      user,
    });

    return this.postRepo.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: ['user'] });
  }

  async findByUser(userId: string): Promise<Post[]> {
    return this.postRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
