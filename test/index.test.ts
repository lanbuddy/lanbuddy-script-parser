import useLaunchScriptParser from "../src/index";

describe("useLaunchScriptParser", () => {
  const { parseObject, parseString, safeParseObject, safeParseString } =
    useLaunchScriptParser();

  const validConfig = {
    game: {
      windows: {
        command: "start-game",
        workingDirectory: "C:\\Games",
      },
    },
    version: 1,
  };

  const validYaml = `
game:
    windows:
        command: start-game
        workingDirectory: C:\\Games
version: 1
`;

  const invalidConfig = {
    game: {
      windows: {
        command: "start-game",
        workingDirectory: "C:\\Games",
      },
    },
    version: 2,
  };

  const invalidYaml = `
game:
    windows:
        command: start-game
        workingDirectory: C:\\Games
version: 2
`;

  test("parseObject should parse a valid config object", () => {
    expect(() => parseObject(validConfig)).not.toThrow();
  });

  test("parseObject should throw an error for an invalid config object", () => {
    expect(() => parseObject(invalidConfig)).toThrow();
  });

  test("parseString should parse a valid YAML string", () => {
    expect(() => parseString(validYaml)).not.toThrow();
  });

  test("parseString should throw an error for an invalid YAML string", () => {
    expect(() => parseString(invalidYaml)).toThrow();
  });

  test("safeParseObject should return success for a valid config object", () => {
    const result = safeParseObject(validConfig);
    expect(result.success).toBe(true);
  });

  test("safeParseObject should return failure for an invalid config object", () => {
    const result = safeParseObject(invalidConfig);
    expect(result.success).toBe(false);
  });

  test("safeParseString should return success for a valid YAML string", () => {
    const result = safeParseString(validYaml);
    expect(result.success).toBe(true);
  });

  test("safeParseString should return failure for an invalid YAML string", () => {
    const result = safeParseString(invalidYaml);
    expect(result.success).toBe(false);
  });
});
