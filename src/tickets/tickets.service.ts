import { Inject, Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Ticket } from "./entities/ticket.entity";

@Injectable()
export class TicketsService {
	constructor(
		@Inject("MYSQL_CONNECTION")
		private readonly mysqlConnection: any,
	) {}

	create(createTicketDto: CreateTicketDto) {
		return "This action adds a new ticket";
	}

	async findAll(): Promise<Ticket[]> {
		try {
			const [rows] = await this.mysqlConnection.execute(
				"SELECT *FROM ticket",
			);

			return rows;
		} catch (error) {
			throw new Error(`Cannot find any tickets ${error}`);
		}
	}

	async findOne(id: number): Promise<Ticket | string> {
		try {
			const [rows] = await this.mysqlConnection.execute(
				"SELECT * FROM ticket WHERE id = ?",
				[id],
			);

			if (rows.length > 0) {
				return rows[0];
			} else {
				return "No ticket with such ID";
			}
		} catch (error) {
			throw new Error(
				`Cannot find ticket with such ID=${id}`,
			);
		}
	}

	update(id: number, updateTicketDto: UpdateTicketDto) {
		return `This action updates a #${id} ticket`;
	}

	remove(id: number) {
		return `This action removes a #${id} ticket`;
	}
}
