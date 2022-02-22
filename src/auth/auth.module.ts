import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';

@Module({
  providers: [AuthService, FirebaseService],
  exports: [AuthService],
})
export class AuthModule {}
