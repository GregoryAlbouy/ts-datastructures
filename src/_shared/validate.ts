import 'reflect-metadata'

// Unused for now. Might be removed.

const requiredKey = Symbol('Required')

function Required(
    target: Object,
    propKey: string | symbol,
    paramIndex: number,
) {
    const existingRequiredParameters: number[] =
        Reflect.getOwnMetadata(requiredKey, target, propKey) || []

    existingRequiredParameters.push(paramIndex)
    Reflect.defineMetadata(
        requiredKey,
        existingRequiredParameters,
        target,
        propKey,
    )
}

function Validate(
    target: any,
    propName: string,
    descriptor: TypedPropertyDescriptor<Function>,
) {
    const method = descriptor.value!

    descriptor.value = function(...args: any[]) {
        const requiredParameters: number[] = Reflect.getOwnMetadata(
            requiredKey,
            target,
            propName,
        )

        if (requiredParameters) {
            for (const parameterIndex of requiredParameters) {
                if (
                    parameterIndex >= args.length ||
                    args[parameterIndex] === undefined
                )
                    throw new Error('Missing required argument.')
            }
        }
        return method.apply(this, args)
    }
}

export {
    Required,
    Validate,
}
