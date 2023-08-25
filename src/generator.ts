#!/usr/bin/env node

import { generatorHandler } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import { convert } from "./convertor";

const WHERE_REQUIRED_ANNOTATION = '@where-required'

generatorHandler({
   onManifest: () => ({
    prettyName: "where-required",
    requiresGenerators: ["prisma-client-js"],
    defaultOutput: '.'
  }),
  onGenerate: async options => {
    const clientGeneratorConfig = options.otherGenerators.find(generatorConfig => generatorConfig.name === "client");
    if (!clientGeneratorConfig) {
      logger.error("No prisma client generator.");
      return;
    }

    const nodeModulePath = options.generator.config.nodeModulePath
    if (!nodeModulePath) {
      logger.error("No nodeModulePath config.");
      return;
    }

    const debug = options.generator.config.debug === "true"

    const requiredModelAndFields = new Map<string, string[]>()
    const models = options.dmmf.datamodel.models

    for (const model of models) {
      const fields = model.fields.filter(field => field.documentation?.includes(WHERE_REQUIRED_ANNOTATION)).map(field=> field.name)
      if (fields.length > 0) {
        requiredModelAndFields.set(model.name, fields)
      }
    }

    convert({path: `${nodeModulePath}/.prisma/client/index.d.ts`, modelAndFields: requiredModelAndFields, debug})
  },
});
