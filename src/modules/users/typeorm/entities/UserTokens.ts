import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Entity UserToken
 * Specified a table in migration UserToken the types and values.
 */
import { v4 as uuid } from 'uuid';
@Entity('user_tokens')
export default class UserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
