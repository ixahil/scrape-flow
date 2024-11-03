"use client";
import React, { useState } from "react";
import Logo from "./shared/logo";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";

export const DesktopSidebar = () => {
  const pathname = usePathname();

  const activeRoute =
    siteConfig.menu.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || siteConfig.menu[0];

  console.log(pathname);

  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b border-separate p-4">
        <Logo />
      </div>
      <div className="p-2">TODO CREDITS</div>
      <nav className="flex flex-col p-2">
        {siteConfig.menu.map((route) => (
          <Link
            key={route.href}
            href={`/${route.href}`}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const activeRoute =
    siteConfig.menu.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || siteConfig.menu[0];

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="space-y-4" side={"left"}>
            <Logo />
            <div className="flex flex-col gap-1">
              {siteConfig.menu.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                  onClick={() => setIsOpen(false)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
