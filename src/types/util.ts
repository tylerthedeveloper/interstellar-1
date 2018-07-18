import * as t from "io-ts";
import * as _ from "lodash";
import { inject } from "mobx-react";
import * as React from "react";

// Mobx Helper
export function injectWithTypes
<T extends React.ComponentType, K extends keyof GetComponentProps<T>>(props: K[] | K, component: T):
    React.ComponentType<Omit<GetComponentProps<T>, K>> {
    if (Array.isArray(props)) {
        return props.reduce((currentComponent, prop) => {
            return inject(prop as string)(currentComponent) as any;
        }, component);
    } else {
        return inject(props as string)(component) as React.ComponentType<Omit<GetComponentProps<T>, K>>;
    }
}

type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P> ? P : never;
export type SetDifference<A, B> = A extends B ? never : A;
type SetComplement<A, A1 extends A> = SetDifference<A, A1>;
type Omit<T, K extends keyof T> = T extends any
    ? Pick<T, SetComplement<keyof T, K>>
    : never;

// GraphQL Helper
export type OnlyForce<O, T extends keyof O> = Required<{[k in T]: NonNullable<O[k]>}> & Partial<O>;

type Nullable<T> = { [P in keyof T]: T[P] | null };
type PartialInput<T> = Partial<Nullable<T>> | null;

export function generateTypeGuards<T>(requiredProps: Array<keyof T>) {

    function is(obj?: PartialInput<T> | null): obj is T {
        return _.isObjectLike(obj) &&
            requiredProps.reduce((stillTrue, prop) => stillTrue && !_.isNil(obj![prop]), true);
    }

    function retainOnly(objs: Array<PartialInput<T>>) {
        return objs.filter(is);
    }

    return {
        is,
        retainOnly,
    };
}
