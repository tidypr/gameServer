import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private repo: Repository<User>

  constructor(@InjectRepository(User) repo: Repository<User>) {
    this.repo = repo;
  }

  async createUser(username: string, password: string): Promise<User> {
    // 인스턴스 생성
    const user = this.repo.create({ username, password });
    return this.repo.save(user);
  }

  // 없을시 null 리턴
  async findUser(id: number): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  // 없을시 빈 배열 리턴
  async findUsers(id?: number): Promise<User[]> {
    // return this.repo.find({ where: { id } });
    return this.repo.find();
  }

  // Partial<T>는 T의 모든 속성을 선택적으로 만듬(0개 ~ 전부)
  async updateUser(id: number, attr: Partial<User>): Promise<User | null> {
    const user = await this.findUser(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    };

    Object.assign(user, attr); // user에 attr을 덮어씌움
    return this.repo.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUser(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    };

    await this.repo.remove(user);
  }
}
