import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * TODO: auto generate this file and test cases
 * like this: 
 * const targetManyActions = ['findMany', 'count', 'deleteMany'] 
 * const targetOneActions = ['findFirst', 'findUnique', 'delete']
*/

// @ts-expect-error args are requered
prisma.user.findMany()

// @ts-expect-error where is requered
prisma.user.findMany({})

// @ts-expect-error organizationId is requered
prisma.user.findMany({where: {}})

prisma.user.findMany({
    where: { organizationId: 1 },
})

prisma.user.findMany({
    where: { organizationId: {in: [1]} }
})

prisma.user.findMany({
    where: { organizationId: undefined }
})

// @ts-expect-error args is requered
prisma.user.findFirst()

// @ts-expect-error where is requered
prisma.user.findFirst({})

// @ts-expect-error organizationId is requered
prisma.user.findFirst({where: {}})

prisma.user.findFirst({
    where: { organizationId: 1 },
})

prisma.user.findFirst({
    where: { organizationId: {in: [1]} }
})

prisma.user.findFirst({
    where: { organizationId: undefined }
})


// @ts-expect-error args is requered
prisma.user.count()

// @ts-expect-error where is requered
prisma.user.count({})

// @ts-expect-error organizationId is requered
prisma.user.count({where: {}})

prisma.user.count({
    where: { organizationId: 1 },
})

prisma.user.count({
    where: { organizationId: {in: [1]} }
})

prisma.user.count({
    where: { organizationId: undefined }
})

// @ts-expect-error args is requered
prisma.user.deleteMany()

// @ts-expect-error where is requered
prisma.user.deleteMany({})

// @ts-expect-error organizationId is requered
prisma.user.deleteMany({where: {}})

prisma.user.deleteMany({
    where: { organizationId: 1 },
})

prisma.user.deleteMany({
    where: { organizationId: {in: [1]} }
})

prisma.user.deleteMany({
    where: { organizationId: undefined }
})
