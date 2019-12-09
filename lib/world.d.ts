import { Condition } from "./condition";
export interface World {
    [key: string]: any;
}
export declare const updateWorld: (world: World, updates: Condition[]) => World;
export declare const isGoalMet: (world: World, goal: Condition[]) => boolean;
