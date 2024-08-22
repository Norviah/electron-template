export type ParamsObject = Record<string, string | string[] | undefined>;

export type LayoutProps = {
  children: React.ReactNode;
};

export type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type PageProps = {
  params: ParamsObject;
  searchParams: ParamsObject;
};

export type SlugPageProps<Keys extends string = 'slug'> = {
  params: {
    [key in Keys]: string;
  };

  searchParams: ParamsObject;
};

export type SlugLayoutProps<Keys extends string = 'slug'> = {
  params: {
    [key in Keys]: string;
  };

  children: React.ReactNode;
};
