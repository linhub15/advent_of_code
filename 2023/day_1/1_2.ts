import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { calibrate } from "./1_1.ts";

const numbers = [
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

function replaceWithDigit(text: string): string {
  const numberWords = numbers.reduce(
    (prev, curr) => ({ ...prev, [curr]: -1 }),
    {} as { [key: string]: number },
  );

  for (const word of Object.keys(numberWords)) {
    const occured = text.indexOf(word);
    numberWords[word as keyof typeof numberWords] = occured;
  }

  const sorted = Object.entries(numberWords)
    .filter((a) => a[1] !== -1)
    .toSorted((a, b) => a[1] - b[1]);

  const first = sorted.at(0);

  if (!first) return text;

  return text.replace(
    first[0],
    Object.keys(numberWords).findIndex((v) => v === first[0]).toString(),
  );
}

function replaceWithDigitReversed(text: string): string {
  text = text.split("").reverse().join("");
  const numberWords = numbers.map(w => w.split("").reverse().join("")).reduce(
    (prev, curr) => ({ ...prev, [curr]: -1 }),
    {} as { [key: string]: number },
  );

  for (const word of Object.keys(numberWords)) {
    const occured = text.indexOf(word);
    numberWords[word as keyof typeof numberWords] = occured;
  }

  const sorted = Object.entries(numberWords)
    .filter((a) => a[1] !== -1)
    .toSorted((a, b) => a[1] - b[1]);

  const first = sorted.at(0);

  if (first) {
    text = text.replace(
      first[0],
      Object.keys(numberWords).findIndex((v) => v === first[0]).toString(),
    );
  }

  return text.split("").reverse().join("");
}

Deno.test("replaceWithDigit", () =>
  assertEquals(replaceWithDigit("two1nine"), "219"));
Deno.test("replaceWithDigit", () =>
  assertEquals(replaceWithDigit("eightwothree"), "8wo3"));
Deno.test("replaceWithDigit", () =>
  assertEquals(replaceWithDigit("abcone2threexyz"), "abc123xyz"));
Deno.test("replaceWithDigit", () =>
  assertEquals(replaceWithDigit("xtwone3four"), "x2ne34"));
Deno.test("replaceWithDigit", () =>
  assertEquals(replaceWithDigit("4nineeightseven2"), "49eight72"));
Deno.test("replaceWithDigit", () =>
  assertEquals(replaceWithDigit("zoneight234"), "z1ight234"));

function calibrate2(val: string): number {
  val = replaceWithDigit(val);
  val = replaceWithDigitReversed(val);
  return calibrate(val);
}

Deno.test("calibrate2", () => assertEquals(calibrate2("two1nine"), 29));
Deno.test("calibrate2", () => assertEquals(calibrate2("eightwothree"), 83));
Deno.test("calibrate2", () => assertEquals(calibrate2("abcone2threexyz"), 13));
Deno.test("calibrate2", () => assertEquals(calibrate2("xtwone3four"), 24));
Deno.test("calibrate2", () => assertEquals(calibrate2("4nineeightseven2"), 42));
Deno.test("calibrate2", () => assertEquals(calibrate2("zoneight234"), 14));
Deno.test("calibrate2", () => assertEquals(calibrate2("7pqrstsixteen"), 76));
Deno.test("calibrate2", () => assertEquals(calibrate2("adedzerodkjs"), 0));

async function main() {
  const file = await Deno.readTextFile("./2023/day_1/input.txt");
  const lines = file.split("\n");

  const calibrations_2 = lines.map(calibrate2).reduce(
    (prev, curr) => prev + curr,
    0,
  );
  console.info(`part_2: ${calibrations_2}`);
}

// await main();

async function conversion() {
  const file = await Deno.readTextFile("./2023/day_1/input.txt");
  const lines = file.split("\n");
  lines.forEach((line) => {
    console.log(line, " => ", calibrate2(line));
  });
}

// await conversion();

// Translated from YouTube python
async function secondAttempt() {
  let ans = 0;
  const file = await Deno.readTextFile("./2023/day_1/input.txt");
  const lines = file.split("\n");
  for (const line of lines) {
    const digits: number[] = [];
    for (const [i, c] of line.split("").entries()) {
      if (!isNaN(Number(c))) {
        digits.push(Number(c));
      }
      for (const [d, number] of numbers.entries()) {
        if (line.slice(i).startsWith(number)) {
          digits.push(d);
        }
      }
    }
    
    const score = Number("" + digits.at(0)! + digits.at(-1)!);
    ans += score;
  }
  return ans;
}

console.log(await secondAttempt());