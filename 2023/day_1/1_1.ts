import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

export function calibrate(val: string): number {
  const numbers = val
    .split("")
    .filter((c) => c === "0" || Number(c));
  const first = numbers.at(0) ?? "";
  const last = numbers.at(-1) ?? "";
  const calibration = first + last;
  return +calibration;
}

Deno.test("calibrate", () => assertEquals(calibrate("1abc2"), 12));
Deno.test("calibrate", () => assertEquals(calibrate("pqr3stu8vwx"), 38));
Deno.test("calibrate", () => assertEquals(calibrate("a1b2c3d4e5f"), 15));
Deno.test("calibrate", () => assertEquals(calibrate("treb7uchet"), 77));

async function main() {
  const file = await Deno.readTextFile("./2023/day_1/input.txt");
  const lines = file.split("\n");
  const calibrations = lines.map(calibrate).reduce(
    (prev, curr) => prev + curr,
    0,
  );
  console.info(`day_1: ${calibrations}`);
}

await main();