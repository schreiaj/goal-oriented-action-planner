import { World } from "./world";
import { Action } from "./action";
import { Condition } from "./condition";
export declare const Solver: (world: World, actions: Action[], goal: Condition[], maxCost?: number, maxActions?: number) => Action[] | null;
