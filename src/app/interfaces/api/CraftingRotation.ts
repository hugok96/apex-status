import {ItemDefinition} from "./ItemDefinition";

export interface CraftingRotation {
    bundle: string,
    bundleType: "daily"|"weekly"|"permanent"
    start?: number,
    end?: number,
    startDate?: string,
    endDate?: string,
    bundleContent: ItemDefinition[],
}
