"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const solver_1 = require("./solver");
const action_1 = require("./action");
const condition_1 = require("./condition");
const world_1 = require("./world");
describe("Solver", () => {
    it("should generate a valid path", () => {
        let worldState = [
            {
                name: "Scale is Blue",
                value: false
            },
            {
                name: "Scale is Red",
                value: false
            },
            {
                name: "Red Switch Owned",
                value: false
            },
            {
                name: "Blue Switch Owned",
                value: false
            },
            {
                name: "Is at HP",
                value: false
            },
            {
                name: "Has Cube",
                value: false
            }
        ].reduce((acc, val) => {
            acc[val.name] = val.value;
            return acc;
        }, {});
        let goalState = [
            {
                name: "Scale is Blue",
                value: true
            },
            {
                name: "Scale is Red",
                value: false
            },
            {
                name: "Red Switch Owned",
                value: false
            },
            {
                name: "Blue Switch Owned",
                value: false
            },
            {
                name: "Is at HP",
                value: false
            },
            {
                name: "Is at Scale",
                value: true
            },
            {
                name: "Has Cube",
                value: true
            }
        ].map(state => {
            return new condition_1.Condition(state.name, state.value);
        });
        let actions = [
            {
                name: "Drive to HP",
                preconditions: [
                    {
                        name: "Is at HP",
                        value: false
                    }
                ],
                results: [
                    {
                        name: "Is at HP",
                        value: true
                    },
                    {
                        name: "Is at Scale",
                        value: false
                    }
                ],
                cost: 2
            },
            {
                name: "Drive to Scale",
                preconditions: [
                    {
                        name: "Is at Scale",
                        value: false
                    }
                ],
                results: [
                    {
                        name: "Is at HP",
                        value: false
                    },
                    {
                        name: "Is at Scale",
                        value: true
                    }
                ],
                cost: 2
            },
            {
                name: "Score on Blue Scale",
                preconditions: [
                    {
                        name: "Has Cube",
                        value: true
                    },
                    {
                        name: "Is at Scale",
                        value: true
                    }
                ],
                results: [
                    {
                        name: "Has Cube",
                        value: false
                    },
                    {
                        name: "Scale is Blue",
                        value: true
                    }
                ],
                cost: 5
            },
            {
                name: "Get Cube From HP",
                preconditions: [
                    {
                        name: "Has Cube",
                        value: false
                    },
                    {
                        name: "Is at HP",
                        value: true
                    }
                ],
                results: [
                    {
                        name: "Has Cube",
                        value: true
                    }
                ],
                cost: 3
            },
            {
                name: "Get Cube From Pile",
                preconditions: [
                    {
                        name: "Has Cube",
                        value: false
                    }
                ],
                results: [
                    {
                        name: "Has Cube",
                        value: true
                    }
                ],
                cost: 9
            }
        ].map(a => new action_1.Action(a.name, a.cost, a.preconditions.map(c => new condition_1.Condition(c.name, c.value)), a.results.map(c => new condition_1.Condition(c.name, c.value))));
        let steps = solver_1.Solver(worldState, actions, goalState, 40, 40) || [];
        expect(steps.length).toBe(7);
        let currentWorld = worldState;
        for (const step of steps) {
            expect(step.isValid(currentWorld)).toBe(true);
            currentWorld = world_1.updateWorld(currentWorld, step.results);
        }
    });
});
