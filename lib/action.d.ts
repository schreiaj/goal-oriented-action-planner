import { Condition } from './condition';
import { World } from './world';
export declare class Action {
    name: string;
    requirements: Condition[];
    results: Condition[];
    cost: number;
    constructor(name: string, cost: number, requires: Condition[], results: Condition[]);
    isValid(world: World): boolean;
}
