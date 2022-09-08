import {Component, NgZone, OnInit} from '@angular/core';
import {MapRotations} from "../../interfaces/api/MapRotations";
import {ApexApiService} from "../../services/apex-api.service";
import {CraftingRotation} from "../../interfaces/api/CraftingRotation";

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.sass']
})
export class CraftingComponent implements OnInit {
    public rotations : CraftingRotation[]|null = null;
    private tickId : number|null = null;
    private loading : boolean = false;
    public dailyRotation : CraftingRotation[] = [];
    public weeklyRotation : CraftingRotation[] = [];
    public weapons : CraftingRotation[] = [];
    public permanent : CraftingRotation[] = [];
    public weeklyEnd : Date = new Date();
    public dailyEnd : Date = new Date();

    constructor(private api : ApexApiService, private zone : NgZone) {
        const cache = localStorage.getItem("api.crafting");
        if(cache !== undefined && cache !== null)
            this.setRotations(JSON.parse(cache));
    }

    ngOnInit(): void {
        this.retrieveNewData();
    }

    ngOnDestroy(): void {
    }

    public date(dt: number) {
        return new Date(dt*1000);
    }

    setRotations(rotations: CraftingRotation[]|null) {
        this.rotations = rotations;
        this.dailyRotation  = this.rotations?.filter(r => r.bundleType === 'daily') ?? [];
        this.weeklyRotation = this.rotations?.filter(r => r.bundleType === 'weekly') ?? [];
        this.weapons        = this.rotations?.filter(r => r.bundle.includes('weapon_')) ?? [];
        this.permanent      = this.rotations?.filter(r => r.bundleType === 'permanent' && !r.bundle.includes('weapon_')) ?? [];
        for(let p of this.permanent) {
            if (p.bundle === 'ammo')
                p.bundleContent = [p.bundleContent[0]];
        }

        this.dailyEnd = new Date((this.dailyRotation?.map(r => r.end)?.shift() ?? 0) * 1000)
        this.weeklyEnd = new Date((this.weeklyRotation?.map(r => r.end)?.shift() ?? 0) * 1000)
    }

    setRotationTimeout() {
        if(this.rotations !== null && this.tickId === null) {
            let end = this.rotations.filter(r => r.end !== undefined).map(r => r.end).sort().shift();
            const now = new Date().getTime() / 1000;
            if(end !== undefined && end > now) {
                this.tickId = setTimeout(() => {
                    this.tickId = null;
                    this.retrieveNewData();
                }, end - now + 10);
                console.log(end - now + 10);
            }
        }
    }

    retrieveNewData(): void {
        if(this.loading)
            return;

        this.setRotationTimeout();
        console.log(this.tickId);
        if(this.tickId === null) {
            this.loading = true;
            this.api.getCraftingRotations()().subscribe(r => {
                this.setRotations(r);
                localStorage.setItem('api.crafting', JSON.stringify(r));

                this.loading = false;
                this.setRotationTimeout();
            });
        }
    }
}
