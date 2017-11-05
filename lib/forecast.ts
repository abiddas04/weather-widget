import { Component, Input, Output, EventEmitter } from "angular2/core";
import { Http, Response, HTTP_PROVIDERS } from "angular2/http";

import { getUrl, ForecastResponse } from "./api";

export interface ForecastData {
    date: string;
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
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: "./forecast.html",
    styleUrls: ["../static/forecast.css"]
})
export class Forecast {
    temperatureUnit = "degrees Celsius";
    private _tomorrow = false;
    @Input()
    set tomorrow(value) {
        if (this._tomorrow === value) { return; }
        this._tomorrow = value;
        this.filterData();
    }
    get tomorrow() {
        return this._tomorrow;
    }
    private _location: string;
    @Input()
    set location(value) {
        if (this._location === value) { return; }
        this._location = value;
        this.state = State.Loading;
        this.data = [];
        this.load();
    }
    get location() {
        return this._location;
    }
    fullData: ForecastData[] = [];
    data: ForecastData[] = [];
    state = State.Loading;

    constructor(private http: Http) {
        // ...
    }

    get loading() {
        return this.state === State.Loading;
    }
    get refreshing() {
        return this.state === State.Refreshing;
    }
    get loaded() {
        return this.state === State.Loaded;
    }
    get error() {
        return this.state === State.Error;
    }

    @Output()
    correctLocation = new EventEmitter<string>(true);

    private formatDate(date: Date) {
        return date.getHours() + ":" + date.getMinutes() + date.getSeconds();
    }
    private load() {
        let path = "forecast?mode=json&";
        const start = "coordinate";
        if (this.location && this.location.substring(0, start.length).toLowerCase() === start) {
            const coordinate = this.location.split(" ");
            path += `lat=${parseFloat(coordinate[1])}&lon=${parseFloat(coordinate[2])}`;
        } else {
            path += "q=" + this.location;
        }
        this.state = this.state === State.Loaded ? State.Refreshing : State.Loading;
        this.http.get(getUrl(path))
                 .map(response => response.json())
                 .subscribe(res => this.update(<ForecastResponse> res), () => this.showError());
    }

    private update(data: ForecastResponse) {
        if (!data.list) {
            this.showError();
            return;
        }
        const location = data.city.name + ", " + data.city.country;
        if (this._location !== location) {
            this._location = location;
            this.correctLocation.next(location);
        }
        this.fullData = data.list.map(item => ({
            date: this.formatDate(new Date(item.dt * 1000)),
            temperature: Math.round(item.main.temp - 273),
            main: item.weather[0].main,
            description: item.weather[0].description
         }));
         this.filterData();
         this.state = State.Loaded;
    }
    private showError() {
        this.data = [];
        this.state = State.Error;
    }
    private filterData() {
        const start = this.tomorrow ? 8 : 0;
        this.data = this.fullData.slice(start, start + 8);
    }

}
