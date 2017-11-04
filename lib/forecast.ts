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
    template: `
    <span *ngIf="loading" class="state">Loading...</span>
    <span *ngIf="refreshing" class="state">Refreshing...</span>
    <a *ngIf="loaded || error" href="javascript:;" (click)="load()" class="state">Refresh</a>
    <h2>{{ tomorrow ? 'Tomorrow' : 'Today'}}'s weather in {{   location }}</h2>
    <div *ngIf="error">Failed to load data.</div>
    <ul>
        <li *ngFor="#item of data">
            <div class="item-date">{{item.date}}</div>
            <div class="item-main">{{item.main}}</div>
            <div class="item-description">{{item.description}}</div>
            <div class="item-temperature">
                {{item.temperature}} {{temperatureUnit}}
            </div>
        </li>
    </ul>
    <div class="clearfix"></div>
    `,
    styles: [
        `.state {
            float: right;
            margin-top: 6px;
        }
        ul {
            margin: 0;
            padding: 0 0 15px;
            list-style: none;
            width: 100%;
            overflow-x: scroll;
            white-space: nowrap;
        }
        li {
            display: inline-block;
            margin-right: 15px;
            width: 170px;
            white-space: initial;
        }
        .item-date {
            font-size: 15pt;
            color: #165366;
            margin-right: 10px;
            display: inline-block;
        }
        .item-main {
            font-size: 15pt;
            display: inline-block;
        }
        .item-description {
            border-top: 1px solid #44A4C2;
            width: 100%;
            font-size: 11pt;
        }
        .item-temperature {
            font-size: 11pt;
        }`
    ]
})
export class Forecast {
    temperatureUnit = "degrees Celsius";

    @Input()
    tomorrow = false;
    @Input()
    location = "Aurora, CO";
    data: ForecastData[] = [];
    state = State.Loading;
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
}
