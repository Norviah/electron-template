## zod

### about

to give a quick overview of zod, it's a schema validation library that allows us to define the desired shape of our data and then validate something against that shape. it's a great tool for ensuring that the data we're working with is what we expect it to be.

the reason why this is useful is because since we're working with typescript, we can simply say "set this api response to X", and go from there, but the issue is that since we're working with an api, there is no guarantee that the data is of the expected shape. in a way, zod is like a middleman between typescript and our code.

### schemas

how zod works is that we first define a schema of whatever data we want to work with. for example, if we're working with a user, we can define a schema like this:

```ts
import { z } from "zod";

const UserSchema = z.object({
   id: z.string(),
   username: z.string(),
   email: z.string().email(),
})

type User = z.infer<typeof UserSchema>;
```

when we use `z.infer<[schema]>`, we're able to translate the schema into a typescript type that we can reference in our code. in this case, `User` would look like this:

```ts
type User = {
   id: string;
   username: string;
   email: string;
}
```

so then we can have a function or something else that either takes and/or returns the `User` type, which follows the schema we defined.

in addition to primitives such as

   -  strings: `z.string()`
   -  numbers: `z.number()`
   -  booleans: `z.boolean()`
   -  nulls: `z.null()`
   -  undefined: `z.undefined()`

we can also define arrays and objects. for example, a user may have a list of posts, so we can define a schema like this:

```ts
const PostSchema = z.object({
   id: z.string(),
   title: z.string(),
   content: z.string(),
})

type Post = z.infer<typeof PostSchema>;

const UserSchema = z.object({
   id: z.string(),
   username: z.string(),
   email: z.string().email(),
   posts: z.array(PostSchema),
})

type User = z.infer<typeof UserSchema>;
```

with this new schema, we specify that users have a list of posts, and we can use the `Post` type in our code as well.

### validation

in order to use a specific schema to parse data, we can simply use the `parse` on the schema you want to use:

```ts
const data = /* api call or something else that returns data */

const user = UserSchema.parse(data);
console.log(user.name);
```

if the parsing is successful, we're 100% sure that the data is in the shape we expect it to be. if it fails, the `parse` method will always throw an error if the data is not in the correct shape.

instead, if you use the `safeParse` method, it will return a result type that looks like this:

```ts
type Result<T> = {
   success: true;
   data: T;
} | {
   success: false;
   error: z.ZodError;
}
```

`safeParse` will never throw and will always return an object like this: if `success` is true, `data` will be the desired data.

## generics

the cool thing about this, which is more of a cool thing about typescript, is that we can use generics to work with zod/schemas as well.

### overview

to give a quick overview of generics, it's a way to make a function or class modular/resuable/abstract by allowing it handle different types of data. when defining a function/class, you can specify a type parameter which represents a placeholder type that can be used and referenced within the function/class properties and methods.

for a simple example, we can define a function that returns the first element of an array:

```ts
function firstElement<T>(arr: T[]): T {
   return arr[0];
}
```

in this example, `T` is a generic/type parameter that represents the type of the array. when defining the parameter `arr`, we specify that it's an array of type `T`, and then we return the first element of the array, which is of type `T`.

when using the function, you can either specify the type parameter explicitly:

```ts
const number = firstElement<number>([1, 2, 3]);
```

or you can let typescript infer the type parameter for you:

```ts
const letter = firstElement(["a", "b", "c"]);
```

if you do specify it explicity, then typescript will enforce that the array you pass in is of the type you specified.

```ts
const letter = firstElement<number>(["a", "b", "c"]); // error as the array is not a number array
```

### zod

the above examples are rather simple, but we can use generics to do more powerful and useful things. an example being zod.

zod gives us types that uses generics to represent things. an exmaple is the `z.infer` type, which you've seen before. this type uses generics to represent a zod schema, and then translates it into a typescript type.

with zod, we can use generics to create a function to simply call an api and parse the response dynamically using a schema.

```ts
import type { z, ZodSchema } from "zod";

const BASE_PATH = /* base aws url */

export type APIOptions<Schema extends ZodSchema> {
   path: string;
   schema: Schema;
}

export async function GET<Schema extends ZodSchema>(options: APIOptions<Schema>): Promise<z.infer<Schema>> {
   const response = await fetch(`${BASE_PATH}${options.path}`);
   const data = await response.json();
   return options.schema.parse(data);
}
```

1. first, we define the type `APIOptions` which takes in the generic parameter `Schema` which extends `ZodSchema`. `ZodSchema` is a type that represents a schema that we've already defined using zod. (for example, if we use `Schema extends string`, then we can only have strings as the generic parameter). since `Schema` extends `ZodSchema`, we ensure that the generic parameter is a zod schema. using this generic type, we'll specify that `schema` shares the same type as the generic parameter, ensuring that when we use this type, the `schema` property must be a zod schema.

2. then, we'll define the `GET` method using the same generic parameter and have the options parameter be of the type `APIOptions<Schema>`. this could get kinda confusing, `GET` first defines a generic parameter `Schema` (which must be a zod schema), then `APIOptions` simply uses that same generic parameter for the `schema` property. this is a way to ensure that the schema we pass in is of the same type as the generic parameter.

3. for the return type, we'll set it to `Promise<z.infer<Schema>>`. to break it down:
   - first, we have the `Promise<T>` generic type, which simply represents a promise that resolves to a value of type `T`. since this function is asynchronous, it must return a promise.
   - then, we'll have `z.infer<Schema>` as the type parameter for the promise value. `z.infer` is a type that takes in a zod schema and translates it into a typescript type. since `Schema` is a zod schema, we can use it as the type parameter for `z.infer`. what this does, is that when this function is called and passed a zod schema, it will return a promise that resolves to the type of the schema.

4. for the body of the function, we'll simply call the api and desired path, then parse the response using the schema we passed in. since `options.schema` is ensured to be a zod schema, we can use the `parse` method on it to ensure that the data is in the expected shape when calling the function. in addition, typescript also correctly gives related intellisense and type checking when using `options.schema` because it knows it's a zod schema.

here's how we can use this function:

```ts
/* using the user schema from before */

const user = await GET({
   path: "/user",
   schema: UserSchema,
});
```

with this example, we're letting typescript automatically infer the types for us. since `schema` is of type `UserSchema`, typescript will then infer that the return type of the function is of type `User`. so then we can use the `user` variable as if it's of type `User`.

if we were to explicitly specify the type parameter, then typescript will enforce that the schema we pass in is of the type we specified:

```ts
const user = await GET<MessageSchema>({
   path: "/user",
   schema: UserSchema, // error because the schema is not of type MessageSchema
});
```