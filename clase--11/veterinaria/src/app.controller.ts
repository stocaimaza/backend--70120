import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/firulais")
  firulais():string {
    return "Hola soy Firulais"
  }

  @Get("/conbarra")
  saludo() : string {
    return "Buen diaaa, practicamos con barra"
  }

  @Get("sinbarra")
  saludito(): string {
    return "Saluditos, sin barra ahora"
  }

}
