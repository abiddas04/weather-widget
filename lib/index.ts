import "zone.js";
import "rxjs";
import "reflect-metadata";
import "es6-shim";
// import { NgModule }      from "@angular/core";
import { bootstrap } from "angular2/platform/browser";
// import { FormsModule }   from "@angular/forms"; // <-- NgModel lives here

// import { About }  from "./about";
// import { Forecast } from "./forecast";
import { Widget } from "./widget";

// bootstrap(About).catch(err => console.log(err));
// bootstrap(Forecast).catch(err => console.log(err));
bootstrap(Widget).catch(err => console.log(err));
