"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = require("./world");
exports.Solver = (world, actions, goal, maxCost = Infinity, maxActions = Infinity) => {
    let leaves = [];
    let visited = new Set();
    if (world_1.isGoalMet(world, goal)) {
        return [];
    }
    for (const a of actions.filter(a => a.isValid(world))) {
        leaves.push({ cost: a.cost, actions: [a], world: world_1.updateWorld(world, a.results) });
    }
    leaves.sort(cost_sort);
    while (leaves.length > 0) {
        const leaf = leaves.shift();
        if (!leaf || leaf.cost >= maxCost) {
            break;
        }
        if (leaf.actions.length >= maxActions) {
            continue;
        }
        if (world_1.isGoalMet(leaf.world, goal)) {
            return leaf.actions;
        }
        if (visited.has(leaf)) {
            continue;
        }
        visited.add(leaf);
        for (const a of actions.filter(a => a.isValid(leaf.world))) {
            leaves.push({ cost: leaf.cost + a.cost, actions: [...leaf.actions, a], world: world_1.updateWorld(leaf.world, a.results) });
        }
        leaves.sort(cost_sort);
    }
    return null;
};
const cost_sort = (a, b) => {
    return a.cost - b.cost;
};
