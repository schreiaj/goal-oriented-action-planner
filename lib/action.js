"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    constructor(name, cost, requires, results) {
        this.name = name;
        this.cost = cost;
        this.requirements = requires;
        this.results = results;
    }
    isValid(world) {
        return this.requirements.every(r => r.isMet(world));
    }
}
exports.Action = Action;
