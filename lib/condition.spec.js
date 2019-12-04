"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const condition_1 = require("./condition");
describe("Condition", () => {
    it("it should return false when not met", () => {
        const con = new condition_1.Condition("Test", false);
        expect(con.isMet({ "Test": true })).toEqual(false);
    });
    it("it should return true when met", () => {
        const con = new condition_1.Condition("Test", true);
        expect(con.isMet({ "Test": true })).toEqual(true);
    });
    it("it should return false when the world doesn't contain that condition", () => {
        const con = new condition_1.Condition("Test2", true);
        expect(con.isMet({ "Test": true })).toEqual(false);
    });
});
