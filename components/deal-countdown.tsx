'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2025-04-01T00:00:00");

const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        clearInterval(timerInterval);
      }

      return () => clearInterval(timerInterval);
    }, 1000);
  }, []);

  if (!time) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">Loading Countdown...</h3>
        </div>
      </section>
    );
  }

  if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-4 justify-center">
          <h3 className="text-3xl font-bold text-center md:text-left">Deal has Ended</h3>
          <p>This deal is no longer available. Checkout our latest promotions!</p>
          <div className="text-center md:text-left">
            <Button asChild>
              <Link href="/shop">View More Product Packages</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <Image src="/images/promo.png" alt="promo" width={450} height={450} className="rounded-lg"/>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-20">
      <div className="flex flex-col gap-4 justify-center">
      <h3 className="text-3xl font-bold text-center md:text-left">First Asian Travel to Da Nang, Vietnam</h3>
        <p className="text-lg">
        We are excited to announce that our first Asian 
        travel qualification has been extended until March 31, 2025, 
        to allow more iGift Distributors to qualify and join.
        </p>
        <ul className="grid grid-cols-4 gap-4 my-4">
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
        <div className="text-center">
          <Button asChild>
            <Link href="https://learn.igift.com.ph/community/space/say-hello/post/qualification-for-the-a" target="_blank">View the Mecahnics</Link>
          </Button>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <Image src="/images/travel-promo.png" alt="promo" width={450} height={450} className="rounded-lg" />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="p-4  rounded-2xl shadow-md text-center">
    <p className="text-4xl font-extrabold">{value}</p>
    <p className="md:text-lg text-sm">{label}</p>
  </li>
);

export default DealCountdown;
