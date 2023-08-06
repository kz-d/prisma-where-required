import { Project, Node, SourceFile } from "ts-morph";

function removeQuestionTokenFromTargetFieldProperty(sourceFile: SourceFile, modelAndFields: Map<string, string[]>) {
    const prismaNamespace = sourceFile.getModuleOrThrow("Prisma");
    const allWhereInputTypes = prismaNamespace.getTypeAliases()
        .filter(typeAlias => typeAlias.getName().endsWith("WhereInput"));

    for (const [targetModel, fields] of modelAndFields.entries()) {
        for (const whereInputType of allWhereInputTypes) {
            if (whereInputType.getName() !== `${targetModel}WhereInput`) {
                continue
            }

            const typeNode = whereInputType.getTypeNodeOrThrow()

            if (!Node.isTypeLiteral(typeNode)) {
                continue
            }

            const properties = typeNode.getProperties()

            for (const property of properties) {
                if (!Node.isPropertySignature(property)) {
                    continue
                }

                const propertyName = property.getName()

                if (!fields.includes(propertyName)) { 
                    continue
                }
                
                console.debug(`remove question token from ${targetModel}.${property.getName()}`)
                console.debug(`add undefined type to ${targetModel}.${property.getName()}`)

                const currentType = property.getTypeNode()!.getText();
                const newType = `${currentType} | undefined`;
                property.replaceWithText(`${propertyName}: ${newType};`)
            }
        }
    }
}

function removeQuestionTokenFromWhereFieldProperty(sourceFile: SourceFile, models: string[]) {
    const prismaNamespace = sourceFile.getModuleOrThrow("Prisma");
    const allTypes = prismaNamespace.getTypeAliases()
        .filter(typeAlias => models.some((targetModel) => typeAlias.getName().startsWith(targetModel) && !typeAlias.getName().startsWith(`${targetModel}$`)));

    for (const targetType of allTypes) {
        const typeNode = targetType.getTypeNodeOrThrow()

        if (!Node.isTypeLiteral(typeNode)) {
            continue
        }

        const properties = typeNode.getMembers()

        for (const property of properties) {
            if (!Node.isPropertySignature(property)) {
                continue
            }

            if (property.getName() !== 'where') { 
                continue
            }

            const propertyTypeNode = property.getTypeNode()

            if (!propertyTypeNode || !models.some((targetModel) => propertyTypeNode.getText() === `${targetModel}WhereInput`)) {
                continue
            }
            
            if (property.hasQuestionToken() === false) {
                continue 
            }

            console.debug(`remove question token from ${targetType.getName()}.where`)
            property.setHasQuestionToken(false)
        }
    }
}

function removeQuestionTokenFromActionFuncProperty(sourceFile: SourceFile, models: string[]) {
    const prismaNamespace = sourceFile.getModuleOrThrow("Prisma");
    const delegates = prismaNamespace.getInterfaces()
        .filter(_interface => models.some((targetModel) => _interface.getName() === `${targetModel}Delegate`));

    for (const delegate of delegates) {
        const methods = delegate.getMethods()

        for (const targetMethod of methods) {
            const parameter = targetMethod.getParameters()[0]

            if (parameter.hasQuestionToken() === false) {
                continue 
            }
            
            console.debug(`remove question token from ${delegate.getName()}.${targetMethod.getName()}.args`)
            parameter.setHasQuestionToken(false)
        }
    }
}

export function convert(args: {path: string, modelAndFields: Map<string, string[]>}) {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(args.path);
    const models = Array.from(args.modelAndFields.keys())

    removeQuestionTokenFromTargetFieldProperty(sourceFile, args.modelAndFields)
    removeQuestionTokenFromWhereFieldProperty(sourceFile, models)
    removeQuestionTokenFromActionFuncProperty(sourceFile, models)

    sourceFile.saveSync();
}
