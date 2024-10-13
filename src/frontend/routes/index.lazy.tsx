import { Button } from '@frontend/components/ui/Button';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col gap-2 w-20'>
      <Button variant='outline' onClick={() => setCount((prev) => prev + 1)}>
        Count: {count}
      </Button>
    </div>
  );
}
