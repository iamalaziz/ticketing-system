import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Tickets")
@Controller("tickets")
export class TicketsController {
	constructor(private readonly ticketsService: TicketsService) {}

	@Post()
	create(@Body() createTicketDto: CreateTicketDto) {
		return this.ticketsService.create(createTicketDto);
	}

	@ApiResponse({
		status: 200,
		description: "Successfully got all tickets ",
	})
	@ApiResponse({
		status: 400,
		description: "Cannot get tickets",
	})
	@Get()
	findAll() {
		return this.ticketsService.findAll();
	}

	@ApiQuery({
		name: "id",
		required: false,
		type: Number,
		description: "ID of movie",
	})
	@ApiResponse({
		status: 200,
		description: "Successful response",
	})
	@ApiResponse({
		status: 400,
		description: "Bad request",
	})
	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.ticketsService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
		return this.ticketsService.update(+id, updateTicketDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.ticketsService.remove(+id);
	}
}
