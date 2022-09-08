import {AfterViewInit, Component, Pipe, PipeTransform} from '@angular/core';
import {ApexApiService} from "./services/apex-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
    title = 'apex-status';

    constructor() {
    }

    ngAfterViewInit(): void {

    }
}

