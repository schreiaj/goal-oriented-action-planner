import { Condition } from './condition'

describe("Condition", () => {
    it("it should return false when not met", () => {
        const con = new Condition("Test" ,false)
        expect(con.isMet({"Test": true})).toEqual(false);
    });
    it("it should return true when met", () => {
        const con = new Condition("Test" ,true)
        expect(con.isMet({"Test": true})).toEqual(true);
    });
    it("it should return false when the world doesn't contain that condition", () => {
        const con = new Condition("Test2" ,true)
        expect(con.isMet({"Test": true})).toEqual(false);
    });
  });