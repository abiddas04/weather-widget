import { Component, Input } from "angular2/core";
import { ForecastResponse } from "./api";

export interface ForecastData {
    data: string;
    temperature: number;
    main: string;
    description: string;
}

enum State {
    Loading,
    Refreshing,
    Loaded,
    Error
}

@Component({
    selector: "weather-forecast",
    template: `...`
})
export class Forecast {
    temperatureUnit = "degrees Celsius";

    @Input()
    tomorrow = false;
    @Input()
    location = "Aurora, CO";
    data: ForecastData[] = [];
    state = State.Loading;
}
