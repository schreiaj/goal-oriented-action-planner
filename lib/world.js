"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorld = (world, updates) => {
    const newWorld = Object.assign({}, world);
    updates.map(update => {
        newWorld[update.name] = update.output(world);
    });
    return newWorld;
};
exports.isGoalMet = (world, goal) => {
    return goal.every(cond => cond.isMet(world));
};
