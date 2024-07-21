import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ServiceExceptionToHttpExceptionFilter } from "./common/exception-filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle("Ticketing Service")
		.setDescription("The Ticketing Service API description")
		.setVersion("1.0")
		.addTag("tickets")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	app.useGlobalFilters(new ServiceExceptionToHttpExceptionFilter());
	await app.listen(3000);
}
bootstrap();
