import { World } from "./world";
import * as jsonata from "jsonata";
export declare class Condition {
    name: string;
    value: boolean | jsonata.Expression;
    private query?;
    private isStatic;
    constructor(name: string, value: boolean | string);
    isMet: (world: World) => boolean;
    output: (world: World) => any;
}
