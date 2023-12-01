import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { calibrate } from "./1_1.ts";

function replaceWithDigit(text: string): string {
  const numberWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  for (const [index, word] of numberWords.entries()) {
    text = text.replaceAll(word, index.toString());
  }
  return text;
}



function calibrate2(val: string): number {
    val = replaceWithDigit(val);
    return calibrate(val);
}
Deno.test("calibrate2", () => assertEquals(calibrate2("two1nine"), 29));
Deno.test("calibrate2", () => assertEquals(calibrate2("eightwothree"), 83));
Deno.test("calibrate2", () => assertEquals(calibrate2("abcone2threexyz"), 13));
Deno.test("calibrate2", () => assertEquals(calibrate2("xtwone3four"), 24));
Deno.test("calibrate2", () => assertEquals(calibrate2("4nineeightseven2"), 42));
Deno.test("calibrate2", () => assertEquals(calibrate2("zoneight234"), 14));
Deno.test("calibrate2", () => assertEquals(calibrate2("7pqrstsixteen"), 76));

async function main() {
  const file = await Deno.readTextFile("./2023/day_1/input.txt");
  const lines = file.split("\n");

  const calibrations_2 = lines.map(calibrate2).reduce(
    (prev, curr) => prev + curr,
    0,
  );
  console.info(`part_2: ${calibrations_2}`);
}

await main();
