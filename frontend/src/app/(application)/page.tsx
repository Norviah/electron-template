'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Home(): JSX.Element {
  const [value, setValue] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await window.ipc.send('ping', value);

    toast.success('Success', {
      description: response,
    });
  };

  return (
    <form className='flex flex-row gap-2' onSubmit={onSubmit}>
      <Input
        placeholder='Type something'
        required
        onChange={(e) => setValue(e.target.value)}
        className='w-1/2'
      />

      <Button type='submit'>ping</Button>
    </form>
  );
}
