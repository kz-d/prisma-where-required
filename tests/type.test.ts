// !!!this file is auto generated.!!! 

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// @ts-expect-error args are required
prisma.user.findMany()

// @ts-expect-error where is required
prisma.user.findMany({})

// @ts-expect-error organizationId is required
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


// @ts-expect-error args are required
prisma.user.findFirst()

// @ts-expect-error where is required
prisma.user.findFirst({})

// @ts-expect-error organizationId is required
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


// @ts-expect-error args are required
prisma.user.findFirstOrThrow()

// @ts-expect-error where is required
prisma.user.findFirstOrThrow({})

// @ts-expect-error organizationId is required
prisma.user.findFirstOrThrow({where: {}})

prisma.user.findFirstOrThrow({
    where: { organizationId: 1 },
})

prisma.user.findFirstOrThrow({
    where: { organizationId: {in: [1]} }
})

prisma.user.findFirstOrThrow({
    where: { organizationId: undefined }
})


// @ts-expect-error args are required
prisma.user.deleteMany()

// @ts-expect-error where is required
prisma.user.deleteMany({})

// @ts-expect-error organizationId is required
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


// @ts-expect-error args are required
prisma.user.count()

// @ts-expect-error where is required
prisma.user.count({})

// @ts-expect-error organizationId is required
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


// @ts-expect-error where are required
prisma.user.updateMany({data: {}})

// @ts-expect-error organizationId is required
prisma.user.updateMany({data: {}, where: {}})

prisma.user.updateMany({data: {}, where: { organizationId: {in: [1]} }})

prisma.user.updateMany({data: {}, where: { organizationId: 1 }})

prisma.user.updateMany({data: {}, where: { organizationId: undefined }})


// @ts-expect-error where are required
prisma.user.groupBy({by: ['id']})

// @ts-expect-error organizationId is required
prisma.user.groupBy({by: ['id'], where: {}})

prisma.user.groupBy({by: ['id'], where: { organizationId: {in: [1]} }})

prisma.user.groupBy({by: ['id'], where: { organizationId: 1 }})

prisma.user.groupBy({by: ['id'], where: { organizationId: undefined }})
