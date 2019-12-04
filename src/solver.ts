import { World, isGoalMet, updateWorld } from "./world";
import { Action } from "./action";
import { Condition } from "./condition";

interface Path {
    cost: number,
    actions: Action[],
    world: World
}

export const Solver = (world: World, actions: Action[], goal: Condition[], maxCost: number = Infinity, maxActions: number = Infinity) : Action[] | null => {
    let leaves: Path[] = []
    let visited: Set<Path> = new Set()

    // check if the world is in a good state
    if(isGoalMet(world, goal)) {
        // Nothing to do
        return []
    }

    // generate initial leaves from valid actions
    for(const a of actions.filter(a => a.isValid(world))) {
        leaves.push({cost: a.cost, actions: [a], world:updateWorld(world, a.results)})
    }
    leaves.sort(cost_sort)
    while(leaves.length > 0) {
        const leaf = leaves.shift()
        if(!leaf || leaf.cost >= maxCost) {
            break
        }
        if(leaf.actions.length >= maxActions) {
            continue
        }
        // If this is our goal state, let's return
        if(isGoalMet(leaf.world, goal)) {
            return leaf.actions
        }
        // If we've already seen this no reason to continue
        if(visited.has(leaf)) {
            // console.log("Already seen", leaf)
            continue
        }
        visited.add(leaf)
        for(const a of actions.filter(a => a.isValid(leaf.world))) {
            leaves.push({cost: leaf.cost + a.cost, actions: [...leaf.actions,a], world:updateWorld(leaf.world, a.results)})
        } 
        leaves.sort(cost_sort)
    }   
    // No solution found
    return null
}

const cost_sort = (a: Path,b: Path) => {
    return a.cost - b.cost
}

