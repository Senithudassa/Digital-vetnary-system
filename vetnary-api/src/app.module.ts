import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClinicsModule } from './clinics/clinics.module';
import { PetsModule } from './pets/pets.module';
import { VetbookModule } from './vetbook/vetbook.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './ai/ai.module';
import { TicketsModule } from './tickets/tickets.module';
import { AiController } from './ai/ai.controller';
import { AiQuotaMiddleware } from './common/middleware/ai-quota.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ClinicsModule,
    PetsModule,
    VetbookModule,
    AppointmentsModule,
    InvoicesModule,
    AdminModule,
    PrismaModule,
    AiModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AiQuotaMiddleware)
      .forRoutes(AiController);
  }
}
