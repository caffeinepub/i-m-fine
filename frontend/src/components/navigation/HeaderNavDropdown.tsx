import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Menu } from 'lucide-react';

interface HeaderNavDropdownProps {
  onNavigate: (route: string) => void;
  currentRoute?: string;
}

export default function HeaderNavDropdown({ onNavigate, currentRoute }: HeaderNavDropdownProps) {
  const handleValueChange = (value: string) => {
    onNavigate(value);
  };

  return (
    <Select value={currentRoute} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[140px] sm:w-[180px] gap-2 border-2 border-foreground/20 bg-background/95 font-medium hover:bg-accent/50 transition-colors h-9 sm:h-10 text-sm">
        <Menu className="h-4 w-4 flex-shrink-0" />
        <SelectValue placeholder="Navigate" />
      </SelectTrigger>
      <SelectContent className="border-2 border-foreground/20 bg-background/95 backdrop-blur-sm">
        <SelectGroup>
          <SelectLabel>Pages</SelectLabel>
          <SelectItem value="landing">Home</SelectItem>
          <SelectItem value="dashboard">Dashboard</SelectItem>
          <SelectItem value="account">My Account</SelectItem>
          <SelectItem value="tools">Tools</SelectItem>
          <SelectItem value="goals">Goals & Progress</SelectItem>
          <SelectItem value="trophies">Trophies</SelectItem>
          <SelectItem value="testimonials">Testimonials</SelectItem>
          <SelectItem value="community">Community Resources</SelectItem>
          <SelectItem value="resources">Resources & PDFs</SelectItem>
          <SelectItem value="videos">Videos & Music</SelectItem>
          <SelectItem value="links">Links</SelectItem>
          <SelectItem value="legal">Legal</SelectItem>
          <SelectItem value="playbook">Program Director Playbook</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
