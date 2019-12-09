"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonata = require("jsonata");
class Condition {
    constructor(name, value) {
        this.value = false;
        this.isStatic = true;
        this.isMet = (world) => {
            if (this.isStatic) {
                return world[this.name] === this.value || false;
            }
            let retVal = this.value.evaluate(world);
            if (typeof retVal === 'boolean') {
                return retVal;
            }
            throw Error(`Query: '${this.query}' returned a non boolean result.`);
        };
        this.output = (world) => {
            if (this.isStatic) {
                return this.value;
            }
            return this.value.evaluate(world);
        };
        this.name = name;
        if (typeof value === "string") {
            this.isStatic = false;
            this.value = jsonata(value);
            this.query = value;
        }
        else {
            this.value = value;
        }
    }
}
exports.Condition = Condition;
