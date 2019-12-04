import { World } from './world';
export declare class Condition {
    name: string;
    value: boolean;
    constructor(name: string, value: boolean);
    isMet: (world: World) => boolean;
}
