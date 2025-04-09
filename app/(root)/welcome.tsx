"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/button";
import { ChevronRight, UserIcon } from "lucide-react";
import Link from "next/link";

export function WelcomeGuest() {
    const images = [
        "/welcome/1.jpg",
        "/welcome/2.jpg",
        "/welcome/4.jpg",
        "/welcome/5.jpg",
        "/welcome/6.jpg",
        "/welcome/7.jpg",
        "/welcome/8.jpg",
        "/welcome/9.jpg",
        "/welcome/10.jpg",
        "/welcome/11.jpg",
        "/welcome/12.jpg",
        "/welcome/13.jpg",
        "/welcome/14.jpg",
        "/welcome/15.jpg",
        "/welcome/16.jpg",
        "/welcome/17.jpg",
        "/welcome/18.jpg",
        "/welcome/19.jpg",
        "/welcome/20.jpg",
        "/welcome/21.jpg",
        "/welcome/22.jpg",
        "/welcome/23.jpg",
        "/welcome/24.jpg",
        "/welcome/25.jpg",
        "/welcome/26.jpg",
        "/welcome/27.jpg",
        "/welcome/28.jpg",
        "/welcome/29.jpg",
        "/welcome/30.jpg",
        "/welcome/31.jpg",
    ];    
  return (
    <div className="relative mx-auto flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-none">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
      A Smarter {" "}
        <span className="mb-4 relative z-20 inline-block rounded-2xl bg-yellow-300/40 px-4 py-1 text-white underline decoration-yellow-400 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
        Dashboard,
        </span>{" "}
        the iGift Way.
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
      A smarter way to manage your iGift business, track earnings, and grow.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
      <Button asChild className='px-6 py-3 text-lg text-black bg-yellow-400 hover:bg-yellow-300 border-none rounded-3xl' variant='outline'>
        <Link href='/sign-in'>
        <UserIcon size={64} /> Sign In
        </Link>
     </Button>
    <Button asChild className='rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-lg font-medium text-white hover:text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none' variant='outline'>
        <Link href='/sign-up'>
         Sign Up <ChevronRight size={64} />
        </Link>
     </Button>
      </div>

      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/60" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
