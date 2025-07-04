
'use client';

import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import type { LucideIcon } from 'lucide-react';
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';


interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarNavProps {
  items: NavItem[];
  currentPath: string;
}

export default function SidebarNav({ items, currentPath }: SidebarNavProps) {
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false); 
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.href === '/' ? currentPath === item.href : currentPath.startsWith(item.href);
          
          return (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  asChild={false} // Important: Link is the child, not replacing button
                  onClick={handleLinkClick}
                  isActive={isActive}
                  tooltip={{children: item.label, side:"right", align: "center", sideOffset:8}}
                  className="w-full"
                >
                  <item.icon/>
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </TooltipProvider>
  );
}

