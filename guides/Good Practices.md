### 📜 Documentation

When writing documentation, please be simple, accurate, and precise. Avoid using
complex languages and aim to be clear and concise to ensure that your code is
easily understandable by others (and your future self).

#### 🔧 Functions

For every function and class you may write, please use
[JSDoc](https://jsdoc.app/). JSDoc is a well-established standard for
documentating code, your IDE will be able to read the comments and provide you
with information about the function, class, etc. when you hover over it.

Here is a simple example of a JSDoc comment for a function:

```ts
/**
 * A function that adds two numbers together.
 * 
 * @param augend The first number to add.
 * @param addend The second number to add.
 * @return The sum of the two numbers.
 */
function add(augend: number, addend: number): number {
  return augend + addend;
}
```

For functions that are more complex, you can have a more thorough explanation of
what the function does separated from the top comment and parameters. In either
case, please have a simple, short description of the function at the top of the
comment.

#### ⚙ Components

Since we're working with React, it's more likely that we'll be writing
components than functions or classes. As components are functions, the same
rules applies to them as well.

When documenting a component, please continue to use JSDoc, with the exception
of documenting parameters. If your component does not take in properties, then
you can simply write a JSDoc comment at the top of the component.

The main difference between a function and a component is that components do not
take parameters as arguments, instead, they take in an object which then defines
properties of the component. If your component takes properties, please document
the properties in the form of a type or an interface.

If your component is a bit complex, feel free to also add a `@example` section
and document how to use the component.

A good example of how to document a component is the
[`UploadFile`](../frontend/src/components//UploadFile.tsx) component.

```tsx
type UploadFileProps = {
  /**
   * The classes to apply to the various elements of the component.
   */
  classes?: { /* ... */ };

  /**
   * The text to display within the component.
   */
  prompt?: string;
} & DropzoneOptions;

/**
 * A customizable file upload component.
 *
 * `UploadFile` is a flexible and customizable component that allows users to
 * upload files by using the `react-dropzone` package for the core functionality
 * of the component.
 *
 * The component is highly customizable, allowing you to modify the styling for
 * the various elements of the component in addition to the logic of what to do
 * when an event occurs by accepting the same props as the package.
 *
 * @see https://react-dropzone.js.org/#section-accepting-specific-number-of-files
 * @example
 *
 * ```tsx
 * <UploadFile
 *   onDropAccepted={(file) => {
 *     console.log(`uploaded file(s): ${file.map((f) => f.name).join(', ')}`);
 *   }}
 *   onDropRejected={(files) => {
 *     console.log(`rejected: ${files.map((f) => f.file.name).join(', ')}`);
 *   }}
 *   maxFiles={1}
 * />
 * ```
 *
 * The above example uses the `UplaodFile` component to only accept one file and
 * to log the file(s) that have been uploaded or rejected.
 */
export function UploadFile({ classes, prompt, ...props }: UploadFileProps): JSX.Element {
  /* ... */
}
```

This component is well documented, as it: has a simple description of what the
component does, a more thorough explanation of the component, in addition to
having an example of how to use the component. Note that the component accepts
properties but does not document them in the JSDoc comment, instead, the
properties in the type are documented.

#### 💬 Comments

Code itself should be self-documenting, such that it is not necessary to have a
comment to explain what the code does. Comments should then be used sparingly,
as the code itself should be self-documenting. Names of variable should explain
what it represents, but a comment can be added to document the purpose of the
variable.

Abstracting away a large block of code into a function may replace the need to
document the purpose of the that block of code, since the function name (and
associated JSDoc comment) may document that sufficiently.

All that being said, documentation is important and is better than no
documentation. If you feel that a comment is necessary, please add it.
