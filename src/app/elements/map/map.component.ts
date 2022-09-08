import {Component, Input, OnInit} from '@angular/core';
import {MapRotation} from "../../interfaces/api/MapRotation";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
    @Input()
    public rotation!: {current: MapRotation, next?: MapRotation}|undefined;

    @Input()
    public mode!: string;

    constructor() { }

    ngOnInit(): void {
    }

    public date(dt: number) {
        return new Date(dt*1000);
    }
}
