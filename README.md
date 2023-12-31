# prisma-where-required

## Overview
prisma-where-required is a utility that enforces certain fields to be mandatory in the 'where' clause when using Prisma. 
This tool was primarily created with multi-tenant systems or to perform a soft delete in mind.

This extension requires Prisma 4.0.0 or higher.


## Usage
1. `npm i @kz-d/prisma-where-required -D`

2. Add the following to your schema.prisma file:

```
generator where-required {
  provider = "prisma-where-required"
  nodeModulePath = "node_modules"
}
```

3. Add /// @where-required to the columns you want to make mandatory:

```
model User {
  id    Int     @id @default(autoincrement())
  name String
  organizationId Int  /// @where-required
}
```

4. `npx prisma generate`

After these steps, your code will display the following behaviour:

```
// @ts-expect-error args are required
prisma.user.findMany()

// @ts-expect-error where is required
prisma.user.findMany({})

// @ts-expect-error organizationId is required
prisma.user.findMany({where: {}})

// compile ok
prisma.user.findMany({where: {organizationId: 1}})
```

If you want to perform a search across all records for the mandatory field, you need to **explicitly specify undefined**:

```
prisma.user.findMany({
    where: { organizationId: undefined } // You can fetch all records by bypassing the organizationId.
})
```

## Caution
This implementation is somewhat forceful and the compatibility with future versions of Prisma is uncertain. In particular, using OR, AND, NOT or nested where clauses requires a very verbose and awkward writing style.  
Please exercise careful judgement when applying this to a production environment.

However, it's worth noting that this tool only impacts types, making it easy to opt-out if necessary.

