import * as yaml from "yaml";
import { z } from "zod";

const WindowsFirewallSchema = z.object({
  action: z.enum(["allow", "block"]),
  direction: z.enum(["in", "out"]),
  executable: z.string(),
  name: z.string(),
});

const WindowsStartSchema = z.object({
  arguments: z.optional(z.string()),
  command: z.string(),
  firewallRules: z.optional(z.array(WindowsFirewallSchema)),
  runAsAdmin: z.optional(z.boolean()),
  workingDirectory: z.string(),
});

const StepExecuteSchema = z.object({
  allowedExitCodes: z.optional(z.array(z.number())),
  arguments: z.optional(z.string()),
  command: z.string(),
  runAsAdmin: z.optional(z.boolean()),
  type: z.literal("execute"),
  workingDirectory: z.string(),
});

const StepFileSchema = z.object({
  content: z.string(),
  path: z.string(),
  type: z.literal("file"),
});

const StepFileTemplateSchema = z.object({
  path: z.string(),
  templateFile: z.string(),
  type: z.literal("fileTemplate"),
});

const StepRegistrySchema = z.object({
  key: z.string(),
  keyType: z.enum(["REG_DWORD", "REG_SZ", "REG_MULTI_SZ", "REG_BINARY"]),
  path: z.string(),
  type: z.literal("registry"),
  value: z.string(),
});

const WindowsStepSchema = z.union([
  StepExecuteSchema,
  StepFileSchema,
  StepFileTemplateSchema,
  StepRegistrySchema,
]);

const SetupSchema = z.object({
  windows: z.optional(z.array(WindowsStepSchema)),
});

const StartSchema = z.object({
  windows: z.optional(WindowsStartSchema),
});

const LaunchScriptSchema = z.object({
  game: StartSchema,
  server: z.optional(StartSchema),
  setup: z.optional(SetupSchema),
  version: z.literal(1),
});

export type LaunchScript = z.infer<typeof LaunchScriptSchema>;
export type WindowsFirewall = z.infer<typeof WindowsFirewallSchema>;
export type WindowsStart = z.infer<typeof WindowsStartSchema>;
export type StepExecute = z.infer<typeof StepExecuteSchema>;
export type StepFile = z.infer<typeof StepFileSchema>;
export type StepFileTemplate = z.infer<typeof StepFileTemplateSchema>;
export type StepRegistry = z.infer<typeof StepRegistrySchema>;
export type WindowsStep = z.infer<typeof WindowsStepSchema>;
export type Setup = z.infer<typeof SetupSchema>;
export type Start = z.infer<typeof StartSchema>;

export const useLaunchScriptParser = () => {
  const parseObject = (config: object) => LaunchScriptSchema.parse(config);

  const parseString = (text: string) => {
    const parsed = yaml.parse(text);
    return parseObject(parsed);
  };

  const safeParseObject = (config: object) =>
    LaunchScriptSchema.safeParse(config);

  const safeParseString = (text: string) => {
    const parsed = yaml.parse(text);
    return safeParseObject(parsed);
  };

  return {
    parseObject,
    parseString,
    safeParseObject,
    safeParseString,
  };
};

export default useLaunchScriptParser;
