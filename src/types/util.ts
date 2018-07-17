export type OnlyForce<O,T extends keyof O> = Required<{[k in T]: NonNullable<O[k]>}> & Partial<O>