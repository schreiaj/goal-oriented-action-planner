"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Condition {
    constructor(name, value) {
        this.value = false;
        this.isMet = (world) => {
            return world[this.name] === this.value || false;
        };
        this.name = name;
        this.value = value;
    }
}
exports.Condition = Condition;
