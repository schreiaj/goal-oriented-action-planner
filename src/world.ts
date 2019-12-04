import { Condition } from "./condition"

export interface World {[key: string]: boolean}

export const updateWorld = (world: World, updates: Condition[]) : World => {
    const newWorld = {...world}
    updates.map(update => newWorld[update.name] = update.value)
    return newWorld
}

export const isGoalMet = (world: World, goal: Condition[]) : boolean => {
    return goal.every(cond => cond.isMet(world))
}