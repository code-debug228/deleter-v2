import AbstractController from '@api/abstractions/abstract.controller'
import { Get, Controller } from '@nestjs/common'
import Constants from '@api/utils/Constants'

@Controller(Constants.PREFIX)
export default class MainController extends AbstractController {

  @Get('/')
  findAll(): string {
    console.log(this)
    return 'Don\'t worry, API works successfully.'
  }

}