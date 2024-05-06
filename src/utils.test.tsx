import { calculateAge } from "./utils";

describe("utils", () => {
  it("should calculate the age provided a birth year", () => {
    Object.entries({
      "1990": 34,
      "2000": 24,
      invalid: "N/A",
    }).forEach(([key, value]) => {
      expect(calculateAge(key)).toBe(value);
    });
    const today = new Date("05/06/2024");

    Object.entries({
      "08/01/1980": 43,
      "05/05/1980": 43,
      "06/05/1980": 44,
    }).forEach(([key, value]) => {
      expect(calculateAge(key, today)).toBe(value);
    });
  });
});
