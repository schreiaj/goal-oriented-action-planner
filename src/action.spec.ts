import { Action } from "./action";
import { Condition } from "./condition";
import { updateWorld } from "./world";

describe("Actions", () => {
  it("empty actions are always valid", () => {
    const action = new Action("empty", 0, [], []);
    expect(action.isValid({})).toBe(true);
  });
  it("should be valid if conditions are met", () => {
    const requires = [
      new Condition("attr", true),
      new Condition("attr2", false)
    ];
    const world = { attr: true, attr2: false };
    const action = new Action("empty", 0, requires, []);
    expect(action.isValid(world)).toBe(true);
  });
  it("should be invalid if conditions are not met", () => {
    const requires = [
      new Condition("attr", true),
      new Condition("attr2", true)
    ];
    const world = { attr: true, attr2: false };
    const action = new Action("empty", 0, requires, []);
    expect(action.isValid(world)).toBe(false);
  });
  it("should update world", () => {
    const updates = [new Condition("attr", true), new Condition("attr2", true)];
    const world = { attr: true, attr2: false };
    const action = new Action("empty", 0, [], updates);
    expect(updateWorld(world, action.results)).toMatchInlineSnapshot(`
      Object {
        "attr": true,
        "attr2": true,
      }
    `);
  });
});
