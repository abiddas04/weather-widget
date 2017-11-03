import { Component } from "@angular/core";

@Component({
    selector: "about-page",
    template: `
        <h2>About</h2>
        This widget shows the weather forecast of Aurora.
        The next 24 hours are shown under 'Today' and the forecast of 24-48
        hours ahead under 'Tomorrow.'
    `
})
export class About {
    // ...
}
