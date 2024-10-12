import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select';
import { useTheme } from 'next-themes';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      value={theme}
      onValueChange={(newTheme) => {
        if (newTheme !== theme) {
          setTheme(newTheme);
        }
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a theme' />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
