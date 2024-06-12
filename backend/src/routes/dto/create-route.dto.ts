import { IsArray, IsDateString, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Stop } from "src/stops/interfaces/stop.model";

export class CreateRouteDto {

    @IsOptional()
    start: Stop; //punkt startowy numer przystanku

    @IsNumber()
    startId: number;

    @IsNumber()
    endId: number;

    @IsOptional()
    end: Stop; // PUNKT DOCELOWY numer przystanku

    @IsNumber()
    driverId: number;

    @IsDateString()
    arrival_date: Date; // Data podróży
}