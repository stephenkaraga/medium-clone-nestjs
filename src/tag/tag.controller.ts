import { Controller, Get } from "@nestjs/common";

@Controller()
export class TagController {
    @Get()
    findAll() {
        return ['dragons', 'coffee']
    }
}