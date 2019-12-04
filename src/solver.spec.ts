import { Solver } from "./solver";
import { Action } from "./action";
import { Condition } from "./condition";
import { World, updateWorld } from "./world";

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
    ].reduce((acc: World, val) => {
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
        name: "Has Cube",
        value: true
      }
    ].map(state => {
      return new Condition(state.name, state.value);
    });
    let actions = [
      {
        name: "Score on Blue Scale",
        preconditions: [
          {
            name: "Has Cube",
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
          }
        ],
        results: [
          {
            name: "Has Cube",
            value: true
          }
        ],
        cost: 5
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
        cost: 3
      }
    ].map(
      a =>
        new Action(
          a.name,
          a.cost,
          a.preconditions.map(c => new Condition(c.name, c.value)),
          a.results.map(c => new Condition(c.name, c.value))
        )
    );
    let steps = Solver(worldState, actions, goalState, 25, 10) || []
    expect(steps.length).toBe(3)
    let currentWorld = worldState
    for(const step of steps){
        expect(step.isValid(currentWorld)).toBe(true)
        currentWorld = updateWorld(currentWorld, step.results)
    }
    
  });
});
