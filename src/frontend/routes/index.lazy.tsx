import { Button } from '@frontend/components/ui/Button';
import { Input } from '@frontend/components/ui/Input';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const [count, setCount] = useState(0);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = new FormData(event.currentTarget).get('name');
    const response = await window.api.greet(name as string);

    toast(response);
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button variant='outline' onClick={() => setCount((prev) => prev + 1)} className='w-20'>
        Count: {count}
      </Button>

      <form className='flex flex-row gap-2' onSubmit={onSubmit}>
        <Input placeholder='Name...' className='w-96' name='name' />

        <Button variant='outline' type='submit'>
          greet
        </Button>
      </form>
    </div>
  );
}
