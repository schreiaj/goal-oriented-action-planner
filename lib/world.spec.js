"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = require("./world");
const condition_1 = require("./condition");
describe("World", () => {
    it("should update existing values", () => {
        const world = { attr: false };
        const cond = new condition_1.Condition("attr", true);
        const newWorld = world_1.updateWorld(world, [cond]);
        expect(newWorld["attr"]).toBe(true);
    });
    it("should add new values", () => {
        const world = { attr: false };
        const cond = new condition_1.Condition("attr2", true);
        const newWorld = world_1.updateWorld(world, [cond]);
        expect(newWorld["attr2"]).toBe(true);
        expect(newWorld["attr"]).toBe(false);
    });
    it("should know when goals are met", () => {
        const goal = [
            new condition_1.Condition("attr", true),
            new condition_1.Condition("attr2", true)
        ];
        const world = { attr: true, attr2: true };
        expect(world_1.isGoalMet(world, goal)).toBe(true);
    });
    it("should know when goals are not met", () => {
        const goal = [
            new condition_1.Condition("attr", true),
            new condition_1.Condition("attr2", false)
        ];
        const world = { attr: true, attr2: true };
        expect(world_1.isGoalMet(world, goal)).toBe(false);
    });
    it("should know when goals are not met because state doesn't exist", () => {
        const goal = [
            new condition_1.Condition("attr", true),
            new condition_1.Condition("attr3", false)
        ];
        const world = { attr: true, attr2: true };
        expect(world_1.isGoalMet(world, goal)).toBe(false);
    });
    it("should allow referential updates", () => {
        const world = { attr: 1 };
        const cond = new condition_1.Condition("attr", "attr + 5");
        const newWorld = world_1.updateWorld(world, [cond]);
        expect(newWorld["attr"]).toBe(6);
    });
});
