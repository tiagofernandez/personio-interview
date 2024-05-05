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
  });
});
