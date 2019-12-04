import { Condition } from './condition'
import { World } from './world'

export class Action {
    public name!: string
    public requirements!: Condition[]
    public results!: Condition[]
    public cost!: number

    constructor(name: string, cost: number, requires: Condition[], results: Condition[]){
        this.name = name
        this.cost = cost
        this.requirements = requires
        this.results = results
    }

    public isValid(world: World) {
        return this.requirements.every(r => r.isMet(world))
    }
}