import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.sass']
})
export class CountdownComponent implements OnInit {
    @Input()
    public end!: Date;

    constructor() { }

    ngOnInit(): void {
    }

    get timeLeft() : string {
        if(this.end === undefined)
            return "unknown";

        let diffTime = this.end.getTime() - new Date().getTime();
        diffTime /= 1000; // convert to seconds

        let displayValues = [
            Math.floor(diffTime / 3600 % 24),
            Math.floor(diffTime / 60 % 60),
            Math.floor(diffTime % 60)
        ].map(s => s < 10 ? '0' + s : s).join(':');

        if(diffTime / 3600 >= 24)
            displayValues = Math.floor(diffTime / 3600 / 24) + " days, " + displayValues;

        return displayValues
    }
}
