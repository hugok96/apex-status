import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApexApiService} from "../../services/apex-api.service";
import {MapRotations} from "../../interfaces/api/MapRotations";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.sass']
})
export class MapsComponent implements OnInit, OnDestroy {
    public rotations : MapRotations|null = null;
    private tickId : number|null = null;
    private loading : boolean = false;

    constructor(private api : ApexApiService) {
        const cache = localStorage.getItem("api.maps");
        if(cache !== undefined && cache !== null)
            this.rotations = JSON.parse(cache);
    }

    ngOnInit(): void {
        if(this.tickId === null) {
            this.tickId = setInterval(() => this.tick(), 1000);
            this.tick();
        }
    }

    ngOnDestroy(): void {
        if(null !== this.tickId)
            clearInterval(this.tickId);
    }

    tick(): void {
        if(this.loading)
            return;

        if(this.rotations === null)
            return this.retrieveNewData();

        const now = new Date().getTime() / 1000;

        for(const dt of [this.rotations.battle_royale.current.end, this.rotations.arenas.current.end, this.rotations.arenasRanked.current.end, this.rotations.ranked.current.end]) {
            if(dt < now) {
                this.retrieveNewData();
            }
        }
    }

    retrieveNewData(): void {
        this.loading = true;
        this.api.getMapRotations()().subscribe(r => {
            this.rotations = r;
            localStorage.setItem('api.maps', JSON.stringify(r));
            this.loading = false;
        });
    }

}
