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
          name: "Is at Scale",
          value: true
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
    ].map(
      a =>
        new Action(
          a.name,
          a.cost,
          a.preconditions.map(c => new Condition(c.name, c.value)),
          a.results.map(c => new Condition(c.name, c.value))
        )
    );
    let steps = Solver(worldState, actions, goalState, 40, 40) || [];
    // Should result in the following actions
    // [
    //     'Drive to HP',
    //     'Get Cube From HP',
    //     'Drive to Scale',
    //     'Score on Blue Scale',
    //     'Drive to HP',
    //     'Get Cube From HP',
    //     'Drive to Scale'
    //   ]
    // console.log(steps.map(s => s.name))
    expect(steps.length).toBe(7);
    let currentWorld = worldState;
    for (const step of steps) {
      expect(step.isValid(currentWorld)).toBe(true);
      currentWorld = updateWorld(currentWorld, step.results);
    }
  });
});
