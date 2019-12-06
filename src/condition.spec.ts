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
    it("should allow complex queries on the world", () => {
        const con = new Condition("Test2" ,"Foo + Bar > 2") 
        expect(con.isMet({"Foo": 1, "Bar": 2})).toBe(true)
    });
    it("should error on a non boolean query", () => {
        const con = new Condition("Test2" ,"Foo")  
        expect(() => con.isMet({"Foo": 2})).toThrowError(`Query: 'Foo' returned a non boolean result.`)
    })
  });