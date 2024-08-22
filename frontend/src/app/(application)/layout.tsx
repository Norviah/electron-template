import { PageHeader } from '@/components/layout';
import type { LayoutProps } from '@/types';

export default function ApplicationLayout(props: LayoutProps): JSX.Element {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <PageHeader />

      <main className='container py-5'>{props.children}</main>
    </div>
  );
}
