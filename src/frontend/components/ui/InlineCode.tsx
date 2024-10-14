export type InlineCodeProps = React.HTMLProps<HTMLSpanElement> & {
  text: string;
};

export function InlineCode({ text, ...props }: InlineCodeProps) {
  return (
    <span {...props} className='rounded bg-muted px-1 py-0.5 text-foreground-light'>
      {text}
    </span>
  );
}
