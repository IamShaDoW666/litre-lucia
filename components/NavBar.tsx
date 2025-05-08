"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <header className="fixed md:top-6 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 sm:rounded-2xl bg-background/30 shadow-lg backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-3xl font-bold">
          Litre.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline"
          >
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </nav>

        {/* Call to Action */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link href={"/admin"} passHref>
            <Button>Login</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-xl">Litre.</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col space-y-4 px-4">
                <Link
                  href="#features"
                  className="text-sm font-medium hover:underline"
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium hover:underline"
                >
                  Pricing
                </Link>
                <Link
                  href="#contact"
                  className="text-sm font-medium hover:underline"
                >
                  Contact
                </Link>
                <Link href={"/admin"} passHref>
                  <Button>Login</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
