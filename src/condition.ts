import {World} from './world'

export class Condition {
    public name!: string 
    public value: boolean = false

    constructor(name: string, value: boolean){
        this.name = name
        this.value = value
    }
    
    public isMet = (world:World) => {
        
        return world[this.name] === this.value || false
    }
}