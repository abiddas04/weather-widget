import { Component, Input } from "angular2/core";

@Component({
    selector: "about-page",
    template: `
        <input [(ngModel)]="location" (keyup.enter)="clickGo()" (blur)="clickGo()" />
        <h2>About</h2>
        This widget shows the weather forecast of
        <a [href]="'https://maps.google.com/?q=' + encodedLocation">
            {{location}}
        </a>
        The next 24 hours are shown under 'Today' and the forecast of 24-48
        hours ahead under 'Tomorrow.'.
        <br />
        <a *ngIf="collapsed" href="javascript:;" (click)="show()">Show more</a>
        <div *ngIf="!collapsed">
            The forecast uses data from <a
            href="http://openweathermap.org">Open Weather Map</a>.
            <br />
            <a href="javascript:;" (click)="hide()">Show less</a>
        </div>
    `
})
export class About {
   @Input()
   location: string = "Aurora, CO";
   collapsed = true;

   show() {
       this.collapsed = false;
    //    console.log("Hey!");
   }

   hide() {
       this.collapsed = true;
    //    console.log("Hello!");
   }

   get encodedLocation() {
       return encodeURIComponent(this.location);
   }
}
