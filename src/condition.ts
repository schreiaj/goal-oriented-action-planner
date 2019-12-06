import { World } from "./world";
import * as jsonata from "jsonata";

export class Condition {
  public name!: string;
  public value: boolean | jsonata.Expression = false;
  private query?: string;
  private isStatic: boolean = true;

  constructor(name: string, value: boolean | string) {
    this.name = name;
    if (typeof value === "string") {
      this.isStatic = false;
      this.value = jsonata(value);
      this.query = value
    } else {
      this.value = value;
    }
  }

  public isMet = (world: World) => {
    if (this.isStatic) {
      return world[this.name] === this.value || false;
    }
    let retVal = (this.value as jsonata.Expression).evaluate(world);
    if(typeof retVal === 'boolean') {
        return retVal
    }
    throw Error(`Query: '${this.query}' returned a non boolean result.`)
  };

  public output = (world: World) => {
    if (this.isStatic) {
      return this.value;
    }
    return (this.value as jsonata.Expression).evaluate(world);
  };
}
