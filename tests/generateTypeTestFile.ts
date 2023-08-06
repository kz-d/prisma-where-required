import fs from "fs";

function generateTypeTestFile(outputPath: string) {
    let content = `// !!!this file is auto generated.!!! \n\n`
    content += `import { PrismaClient } from '@prisma/client'\n\n`
    content += `const prisma = new PrismaClient()\n\n`

    const targetActions = ['findMany', 'findFirst', 'findFirstOrThrow', 'deleteMany', 'count'] 

    content += targetActions
    .map((targetMany) => `
// @ts-expect-error args are required
prisma.user.${targetMany}()

// @ts-expect-error where is required
prisma.user.${targetMany}({})

// @ts-expect-error organizationId is required
prisma.user.${targetMany}({where: {}})

prisma.user.${targetMany}({
    where: { organizationId: 1 },
})

prisma.user.${targetMany}({
    where: { organizationId: {in: [1]} }
})

prisma.user.${targetMany}({
    where: { organizationId: undefined }
})\n\n`)
    .join("");

    content += `
// @ts-expect-error where are required
prisma.user.updateMany({data: {}})

// @ts-expect-error organizationId is required
prisma.user.updateMany({data: {}, where: {}})

prisma.user.updateMany({data: {}, where: { organizationId: {in: [1]} }})

prisma.user.updateMany({data: {}, where: { organizationId: 1 }})

prisma.user.updateMany({data: {}, where: { organizationId: undefined }})\n\n`
  
  content += `
// @ts-expect-error where are required
prisma.user.groupBy({by: ['id']})

// @ts-expect-error organizationId is required
prisma.user.groupBy({by: ['id'], where: {}})

prisma.user.groupBy({by: ['id'], where: { organizationId: {in: [1]} }})

prisma.user.groupBy({by: ['id'], where: { organizationId: 1 }})

prisma.user.groupBy({by: ['id'], where: { organizationId: undefined }})\n`

  fs.writeFileSync(outputPath, content, {encoding: "utf-8", flag: "w"});
}



if (require.main === module) {
    const outputPath = "./tests/type.test.ts"
    generateTypeTestFile(outputPath);
}