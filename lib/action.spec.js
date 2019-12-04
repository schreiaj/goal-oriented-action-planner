"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
const condition_1 = require("./condition");
const world_1 = require("./world");
describe("Actions", () => {
    it("empty actions are always valid", () => {
        const action = new action_1.Action("empty", 0, [], []);
        expect(action.isValid({})).toBe(true);
    });
    it("should be valid if conditions are met", () => {
        const requires = [
            new condition_1.Condition("attr", true),
            new condition_1.Condition("attr2", false)
        ];
        const world = { attr: true, attr2: false };
        const action = new action_1.Action("empty", 0, requires, []);
        expect(action.isValid(world)).toBe(true);
    });
    it("should be invalid if conditions are not met", () => {
        const requires = [
            new condition_1.Condition("attr", true),
            new condition_1.Condition("attr2", true)
        ];
        const world = { attr: true, attr2: false };
        const action = new action_1.Action("empty", 0, requires, []);
        expect(action.isValid(world)).toBe(false);
    });
    it("should update world", () => {
        const updates = [new condition_1.Condition("attr", true), new condition_1.Condition("attr2", true)];
        const world = { attr: true, attr2: false };
        const action = new action_1.Action("empty", 0, [], updates);
        expect(world_1.updateWorld(world, action.results)).toMatchInlineSnapshot(`
      Object {
        "attr": true,
        "attr2": true,
      }
    `);
    });
});
