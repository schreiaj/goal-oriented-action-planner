import { World, updateWorld, isGoalMet } from "./world";
import { Condition } from "./condition";

describe("World", () => {
  it("should update existing values", () => {
    const world: World = { attr: false };
    const cond = new Condition("attr", true);
    const newWorld = updateWorld(world, [cond]);
    expect(newWorld["attr"]).toBe(true);
  });
  it("should add new values", () => {
    const world: World = { attr: false };
    const cond = new Condition("attr2", true);
    const newWorld = updateWorld(world, [cond]);
    expect(newWorld["attr2"]).toBe(true);
    expect(newWorld["attr"]).toBe(false);
  });
  it("should know when goals are met", () => {
    const goal = [
      new Condition("attr", true),
      new Condition("attr2", true)
    ];
    const world = { attr: true, attr2: true };
    expect(isGoalMet(world, goal)).toBe(true)
  });
  it("should know when goals are not met", () => {
    const goal = [
      new Condition("attr", true),
      new Condition("attr2", false)
    ];
    const world = { attr: true, attr2: true };
    expect(isGoalMet(world, goal)).toBe(false)
  });
  it("should know when goals are not met because state doesn't exist", () => {
    const goal = [
      new Condition("attr", true),
      new Condition("attr3", false)
    ];
    const world = { attr: true, attr2: true };
    expect(isGoalMet(world, goal)).toBe(false)
  });
});
