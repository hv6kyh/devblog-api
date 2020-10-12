import { Controller, Get } from '@nestjs/common';
import { MenuService } from '../service/menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  public getMenus() {
    return this.menuService.getMenus();
  }
}
