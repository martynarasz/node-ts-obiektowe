import {Aircraft, LocalizedAircraft, MobileAircraft, RegisteredAircraft} from "./interfejsy";
import {Speed_2D, Position} from "./klasy";
import axios from "axios";

export class BaseAircraft implements Aircraft, LocalizedAircraft, MobileAircraft, RegisteredAircraft {
    icao:string;
    position:Position;
    speed:Speed_2D;

    constructor(icao: string, position: Position, speed: Speed_2D) {
        this.icao = icao;
        this.position = position;
        this.speed = speed;
    }

    getIcaoId(): string {
        return this.icao;
    }

    getPosition(): Position {
        return this.position;
    }

    getRegistrationNumber(): string {
        return "";
    }

    getSpeed(): Speed_2D {
        return this.speed;
    }

    getType(): string {
        return "";
    }

}

export class ScanResult {
    timeStamp: number;
    aircrafts: BaseAircraft[];
}

export interface SkyScanner {
    scan();
    getScanResults():ScanResult;
}

export class FlightRadar24 implements SkyScanner {
    getScanResults(): ScanResult {
        return undefined;
    }

    async scan() {
        let url = `https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=51.57,43.98,18.40,19.68`;
        let agent = `Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0`;
        try {
            let res = await axios.get(url, {headers: {'User-Agent': agent}});
            console.log('here....', res.data, typeof res.data, res.data.full_count);
            for (const property in res.data) {
                console.log(`${property}: ${res.data[property]}`);
            }
        } catch (e) {
            console.log('error occurred:', e);
        }
    }
}

let a = new BaseAircraft("pl1", new Position(1,2,3), new Speed_2D(180, 200));
console.log(a.getIcaoId());

let f = new FlightRadar24();
f.scan();