import {Component, Input, OnInit} from '@angular/core';
import {CraftingRotation} from "../../interfaces/api/CraftingRotation";

@Component({
  selector: 'app-crafting-items',
  templateUrl: './crafting-items.component.html',
  styleUrls: ['./crafting-items.component.sass']
})
export class CraftingItemsComponent implements OnInit {
    @Input()
    public rotation!: CraftingRotation;

  constructor() { }

  ngOnInit(): void {
  }

}
