import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { getAffiliateLinkByReferralCode } from "@/lib/actions/affiliate.actions";
import Link from "next/link";
import { notFound} from "next/navigation";
import Image from "next/image";
import { ThumbsDown, ThumbsUp, ArrowBigDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LatestFiveStarReviews from "@/components/shared/sales-page/get-all-5-star-reviews";
import FrequentlyAskedQuestions from "@/components/shared/sales-page/faqs";
import { getOrderSummary } from "@/lib/actions/order.actions";
import { formatNumber } from '@/lib/utils';
import YouTubeEmbed from "@/components/shared/sales-page/youtube-embed";

export const metadata: Metadata = {
  title: 'Tired Unhappy and Always Getting Sick?',
  description: 'Discover how to break free from feeling weak, drained, and constantly worried about getting sick.',
  openGraph: {
    title: 'Tired Unhappy and Always Getting Sick?',
    description: 'Discover how to break free from constantly worried about getting sick.', 
    siteName: 'iGift',
    images: [
      {
        url: 'https://igift.ph/images/tired.png', 
        width: 1200,
        height: 630,
        alt: 'Always Tired',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const AffiliateHealthSalesPage = async (props: {
    params: Promise<{referralCode: string}>
}) => {

    const {referralCode} = await props.params;

    const referral = await getAffiliateLinkByReferralCode(referralCode);
    
    if(!referral) notFound();

    const summary = await getOrderSummary();

      // Assuming summary contains usersCount
      const updatedUsersCount = summary.usersCount + 1503;




    return ( <>
     <div className="flex flex-col justify-start min-h-screen  p-6 text-center">
      {/* Gold Line */}
      <div className="w-full h-1 bg-gold mb-4"></div>

      {/* Logo Section */}
      <div className="flex justify-center mb-2">
        <Link href='/my-account/share' target="_blank">
        <Image
          src="/images/logo.svg"
          alt="iGift Logo"
          width={60}
          height={60}
        />
        </Link>
      </div>

      {/* TTITLE SECTION */}
      <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-5xl mx-auto my-4">
       Tired, Unhappy, <br /> and Always Getting Sick?
      </h1>
      <p className="text-destructive mb-8 max-w-5xl mx-auto italic text-2xl dark:text-red-500">
      See how <span className="font-bold">{formatNumber(updatedUsersCount)}</span> people found a way to feel better and stronger.
      </p>

      {/* BODY SECTION*/}
      <div className="text-left mx-auto max-w-full sm:max-w-3xl">
      <p className="text-xl md:text-lg mt-12">Hi Friend👋,</p>
          <p className="text-xl md:text-lg mt-12">
          My name is <span className="font-bold italic dark:text-gold">{referral.user.name}</span>, and I know exactly how it feels.
          </p>
          <p className="text-xl md:text-lg mt-4">
          If you&apos;re always busy, juggling work and life, and feeling like 
              you&apos;re just one bad day away from getting sick, you&apos;re not alone.<br />
              
          </p>
          <p className="text-xl md:text-lg mt-12">
          Millions feel the same way—but you don&apos;t have to.
          </p>
          <p className="text-xl md:text-lg mt-12">
          Studies show that 70% of your immune system is in your gut.
          This means getting the right nutrients isn&apos;t just a nice bonus—it&apos;s absolutely 
          essential to staying healthy and full of energy.
          </p>
          <p className="text-xl md:text-lg mt-12">
          But here&apos;s the problem:<br />
              With today&apos;s fast-paced lifestyle, it&apos;s almost impossible to 
              get all the nutrients your body needs from food alone.
          </p>
          <p className="text-xl md:text-lg mt-12">
        Because of this, many people are feeling:
      </p>
      <ul className="list-disc pl-5 text-xl md:text-lg">
        <li>Constant fatigue</li>
        <li>Getting sick more often</li>
        <li>Burned out and drained every day</li>
      </ul>

      <p className="text-xl md:text-lg mt-12">
        Adults with weak immune systems are <span className='font-bold'>3X</span> more likely to miss work, take longer to recover from illness, and deal with mental fog —
      </p>
      <p className="text-xl md:text-lg mt-4">
        ...like missing your child&apos;s school play because you&apos;re stuck in bed
      </p>
      <p className="text-xl md:text-lg mt-4">
        …falling behind on important work projects while you recover
      </p>
      <p className="text-xl md:text-lg mt-4">
        …draining your hard-earned money on doctor visits and medications.
      </p>

      <p className="text-xl md:text-2xl mt-12 text-red-500 font-bold">Are you experiencing any of these?</p>
      <ul className="space-y-4 mt-4">
        <li className="flex items-center gap-3">
          <ThumbsDown className="text-red-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className="font-bold">Frequent Illnesses –</span> Catching colds, infections, or getting sick often?
          </p>
        </li>
        <li className="flex items-center gap-3">
          <ThumbsDown className="text-red-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className="font-bold">Constant Fatigue –</span> Feeling tired all the time, even after a full night’s sleep?
          </p>
        </li>
        <li className="flex items-center gap-3">
          <ThumbsDown className="text-red-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className="font-bold">Slow Recovery –</span> Taking longer than usual to bounce back from illnesses or injuries?
          </p>
        </li>
        <li className="flex items-center gap-3">
          <ThumbsDown className="text-red-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className="font-bold">Frequent Infections –</span> Dealing with recurring infections, like UTIs, yeast infections, or respiratory issues?
          </p>
        </li>
        <li className="flex items-center gap-3">
          <ThumbsDown className="text-red-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className="font-bold">Skin Problems –</span> Unexplained rashes, sores, or skin infections that won’t go away?
          </p>
        </li>
      </ul>

      <p className="text-xl md:text-2xl mt-12 font-bold">
  That&apos;s the complete opposite if your <span className='text-green-500'>immune system is strong:</span>
      </p>
      <ul className="space-y-4 mt-4">
        <li className="flex items-center gap-3">
          <ThumbsUp className="text-green-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className='font-bold'>You&apos;ve got the energy to power through your day</span>, whether it&apos;s tackling work or chasing after the kids without feeling worn out.
          </p>
        </li>
        <li className="flex items-center gap-3">
          <ThumbsUp className="text-green-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            When you do get sick, <span className="font-bold">you bounce back quickly</span>, so you don&apos;t miss out on important moments or fall behind.
          </p>

        </li>
        <li className="flex items-center gap-3">
          <ThumbsUp className="text-green-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className='font-bold'>Staying focused is second nature</span>, making it easier to get things done without that brain fog slowing you down.
          </p>
        </li>
        <li className="flex items-center gap-3">
          <ThumbsUp className="text-green-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className='font-bold'>You can truly enjoy time with family and friends</span> without constantly worrying about getting sick.
          </p>
        </li>
        <li className="flex items-center gap-3">
          <ThumbsUp className="text-green-500 w-6 h-6 shrink-0" />
          <p className="text-xl md:text-lg">
            <span className='font-bold'>Your body fights off germs</span> before they even make you feel bad, keeping you strong and healthy.
          </p>
        </li>
      </ul>
      <div className="text-xl md:text-lg mt-12 space-y-12">
      <p>That&apos;s because nutrition that strengthens your immunity is directly involved in supporting your body&apos;s natural defenses.</p>
      <p>Whether you&apos;re trying to stay healthy during flu season or just want to feel your best every day...</p>
      <p>...the right nutrition is what helps your immune system fight off disease and keeps you ready to tackle whatever comes your way.</p>
      </div>
      <p className="text-xl md:text-lg mt-12">
      If you&apos;re looking for a <span className='font-bold'>natural, science-backed way to strengthen your immunity</span>, then look no further...
      </p>

      <h2 className="text-xl md:text-2xl font-bold bg-yellow-500 text-white p-4 mt-12 text-center hover:bg-gradient-to-r from-red-500 to-yellow-500">
        OUR RECOMMENDATION
      </h2>
      <p className='text-5xl md:text-6xl font-bold text-center mt-12'>Strengthen Your Immunity With Immuno Boost Advance+</p>

      <div className="relative rounded-lg group flex justify-center items-center mt-8 dark:bg-white">
      <Image 
          src="/images/power-your-day.png" 
          alt="Immuno Boost Advance+" 
          width={900} 
          height={900} 
          className="object-cover z-10"
        />
      <div className="z-0 absolute inset-0 rounded-lg  bg-gradient-to-r from-red-200 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <p className="text-xl md:text-lg mt-12">
      Stay healthy, energized, and ready for whatever life throws at you with <span className='font-bold'>Immuno Boost Advance+ by iGift</span>—a powerful, 
      all-natural supplement crafted to strengthen your immune system and boost your overall well-being.*
      </p>

      <div className="text-xl md:text-lg mt-12 space-y-12">
      <p>Packed with <span className='font-bold'>Astaxanthin, Vitamin D3, Zinc, Rosehips Extract, Inulin Fiber, and Citrus Bioflavonoids</span>, this expertly formulated blend works together to help you stay one step ahead of illness while fueling your daily energy.*</p>
      
      <p className="italic text-2xl font-bold">It&apos;s not just about the ingredients—it&apos;s the powerful way they work together to deliver unmatched support for your health and energy.</p>
      <div className="relative rounded-lg group flex justify-center items-center mt-8 dark:bg-gray-200">
      <Image 
          src="/images/powerful-ingredients.png" 
          alt="Immuno Boost Advance+" 
          width={900} 
          height={900} 
          className="object-cover z-10"
        />
      <div className="z-0 absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <p className="px-12 font-bold text-xl text-center">Immuno Boost Advance+ helps strengthen your immunity, increase energy levels, and support your body&apos;s natural defenses so you can stay healthy and focused throughout your day.*</p>
      
      <p>This powerful blend boosts your immune system, supports digestive health, reduces inflammation, and enhances your overall well-being so you can face each day with confidence.*</p>
      <p>When your immune system is strong, you feel unstoppable, ready to take on whatever comes your way.</p>
      <p>You&apos;re healthier, more energized, and focused on your goals.</p>
      <div className="my-8 items-center justify-items-center">
        <YouTubeEmbed videoId="ELjVatLiIMM" />
      </div>
      <p>But if your immunity is weak, you&apos;ll likely feel drained, run-down, and constantly at risk of getting sick.</p>
      <p>And we all know how that feels—fatigue sets in, and even the smallest setback can leave you feeling overwhelmed.</p>
      <div className="relative rounded-lg group flex justify-center items-center mt-8">
      <Image 
          src="/images/strength-in-every-bottle.png" 
          alt="Immuno Boost Advance+" 
          width={900} 
          height={900} 
          className="object-cover z-10"
        />
      <div className="z-0 absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <p><span className="font-bold">iGift Immuno Boost Advance+</span> gives your body the essential nutrients it needs to strengthen your immune system, boost your energy, and help you stay healthy so you can perform at your best and feel invincible.*</p>
    </div>


    <h2 className='text-5xl md:text-6xl font-bold text-center mt-12'>Stronger Immunity, More Energy, and Fewer Sick Days</h2>
    
    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
        <div className="rounded-2xl">
          {/* Left Image Section */}
          <div className="flex-shrink-0">
            <Image
              src="/images/astaxanthin.png"
              alt="Astaxanthin Image"
              width={400}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>
        </div>

      {/* Right Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Astaxanthin 10MG</h3>
        <p className="mb-4 font-bold">Feeling too tired to enjoy your family after work?</p>
        <p>
          Astaxanthin fights inflammation and helps you bounce back faster, keeping you energized
          and ready for quality time with your loved ones.
        </p>
      </CardContent>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6 border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Rosehips Extract 100MG</h3>
        <p className="mb-4 font-bold">Skin looking dull from stress?</p>
        <p>
          Rosehips, packed with Vitamin C, not only keep your immune system strong but also give your skin a healthy glow—because looking good is part of feeling good.
        </p>
      </CardContent>

      {/* Right Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/rosehips-extract.png"
            alt="Rosehips Image"
            width={600}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/inulin-fiber.png"
            alt="Inulin Fiber Image"
            width={600}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Inulin Fiber 100MG</h3>
        <p className="mb-4 font-bold">Always bloated or sluggish?</p>
        <p>
          A healthy gut is essential for immunity and energy. Inulin Fiber supports good gut bacteria, keeping you focused and fueled for the day.
        </p>
      </CardContent>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Citrus Bioflavonoids 85mg</h3>
        <p className="mb-4 font-bold">Exposed to pollution and stress?</p>
        <p>
        Citrus Bioflavonoids protect your body from harmful free radicals, so you stay strong no matter what your environment throws at you.
        </p>
      </CardContent>

      {/* Right Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/citrus-bioflavonoids.png"
            alt="Citrus Bioflavonoids Image"
            width={600}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </Card>

    
    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/sodium-ascorbate.png"
            alt="Vitamin C Image"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Sodium Ascorbate 100mg</h3>
        <p className="mb-4 font-bold">Don&apos;t want to feel that first sneeze coming on?</p>
        <p>
        Sodium Ascorbate keeps your immune system ready to fight back before sickness slows you down.
        </p>
      </CardContent>
    </Card>

    <h3 className="text-lg md:text-2xl font-bold bg-yellow-500 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500 text-white p-2 mt-6 text-center flex items-center justify-center gap-2">
      <ArrowBigDown />
      FORTIVIT MICRONUTRIENTS 100MG 
      <ArrowBigDown />
    </h3>


    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/vitamin-d3.png"
            alt="Vitamin D3 Image"
            width={600}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Vitamin D3</h3>
        <p className="mb-4 font-bold">Always stuck indoors?</p>
        <p>
        A lack of sunlight can weaken your immunity. 
        Vitamin D3 fills that gap, keeping your defenses strong so you can power through your daily grind without getting sick.
        </p>
      </CardContent>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Lysine & Magnesium</h3>
        <p className="mb-4 font-bold">Tired of feeling drained?</p>
        <p>
        These nutrients help you stay energized, mentally sharp, and physically strong.
        </p>
      </CardContent>

      {/* Right Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/lysine-magnesium.png"
            alt="Lysine & Magnesium Image"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/zinc.png"
            alt="Zinc Image"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Zinc</h3>
        <p className="mb-4 font-bold">Ever dragged yourself through work with a cold?</p>
        <p>
        Zinc helps your body fight infections and speeds up recovery, getting you back to work and your family faster.
        </p>
      </CardContent>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">B Vitamins</h3>
        <p className="mb-4 font-bold">Mental fog slowing you down?</p>
        <p>
        B vitamins supercharge your brain and body to keep you productive all day.
        </p>
      </CardContent>

      {/* Right Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/b-vitamins.png"
            alt="B Vitamins Image"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/iron.png"
            alt="Iron Image"
            width={300}
            height={300}
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Iron</h3>
        <p className="mb-4 font-bold">Running on empty?</p>
        <p>
        Iron ensures your body gets the oxygen it needs to keep fatigue at bay.
        </p>
      </CardContent>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Calcium</h3>
        <p className="mb-4 font-bold">Struggling with weak bones and cramps?</p>
        <p>
        Calcium helps keep your bones strong and muscles functioning smoothly, so you can move without discomfort.
        </p>
      </CardContent>

      {/* Right Image Section */}
      <div className="rounded-2xl">
        <div className=" bg-white rounded-xl flex-shrink-0">
          <Image
            src="/images/calcium.png"
            alt="Calcium Image"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </Card>

    <Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-4 hover:border-transparent rounded-2xl shadow-lg mt-12 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500">
      {/* Left Image Section */}
      <div className="rounded-2xl">
        <div className="flex-shrink-0">
          <Image
            src="/images/vitamin-a-e.png"
            alt="Vitamin A & E Image"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right Description Section */}
      <CardContent className="flex flex-col justify-center text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 uppercase">Vitamin A & E</h3>
        <p className="mb-4 font-bold">Want to stay resilient?</p>
        <p>
        These antioxidants protect your cells and keep you healthy long-term.
        </p>
      </CardContent>
    </Card>

    <h2 className="text-md md:text-2xl font-bold bg-yellow-500 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500 text-white p-4 mt-12 text-center flex items-center justify-center gap-2">
      CUSTOMERS <span className="underline">LOVE</span> IMMUNO BOOST ADVANCE+
    </h2>

      <LatestFiveStarReviews />

      <h2 className="text-md md:text-2xl font-bold bg-yellow-500 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500 text-white p-6 mt-12 text-center flex items-center justify-center gap-2">
      YOU DESERVE <span className="underline">STRONGER</span> IMMUNITY
    </h2>

    <Card className="flex flex-col md:flex-row gap-4 p-6  hover:border-yellow-400 border-2 border-transparent rounded-b-2xl rounded-t-none shadow-lg ">
        {/* Left Image Section */}
        <div className="rounded-2xl">
          <div className="flex-shrink-0">
            <Image
              src="/images/product-facts.webp"
              alt="Iron Image"
              width={400}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Right Supplement Facts Section */}
        <CardContent className="flex flex-col justify-center text-center md:text-left w-full md:w-2/3">
          <h3 className="text-2xl font-bold mb-4 uppercase">Supplement Facts</h3>
          <table className="min-w-full table-auto border-collapse rounded-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b border-gray-300"></th>
                <th className="px-4 py-2 text-left border-b border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td className="px-4 py-2 border-b border-gray-300 font-bold">Serving Size</td>
                <td className="px-4 py-2 border-b border-gray-300 font-bold">500mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300">Servings per bottle</td>
                <td className="px-4 py-2 border-b border-gray-300">30caps</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300 font-bold text center">Each 500mg caps contains:</td>
                <td className="px-4 py-2 border-b border-gray-300"></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300">Fortivit-Micronutrient Premix</td>
                <td className="px-4 py-2 border-b border-gray-300">100mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300">Sodium Ascorbate</td>
                <td className="px-4 py-2 border-b border-gray-300">100mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300">Inulin Fiber</td>
                <td className="px-4 py-2 border-b border-gray-300">100mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300">Rosehips Extract</td>
                <td className="px-4 py-2 border-b border-gray-300">100mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300">Citrus Bioflavonoids</td>
                <td className="px-4 py-2 border-b border-gray-300">85mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300">Astaxanthin</td>
                <td className="px-4 py-2 border-b border-gray-300">10mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-300">Silicon Dioxide <br /> (Anti-Caking Agent)</td>
                <td className="px-4 py-2 border-b border-gray-300">5mg</td>
              </tr>
            </tbody>
          </table>
          <div className="rounded-2xl mt-2">
          <div className="flex-shrink-0">
            <Image
              src="/images/badges.png"
              alt="Badges"
              width={450}
              height={90}
              className="rounded-xl object-cover"
            />
          </div>
        </div>
        </CardContent>
      </Card>

      <h2 className='text-2xl md:text-3xl font-bold text-center mt-12 uppercase'>Suggested Use:</h2>
      <p className="text-xl md:text-xl mt-6 text-center">
      Take one capsule daily, preferably with a meal or as prescribed by Physician.
      </p>
      <p className="text-lg md:text-sm mt-6 text-center">

      Some customers feel the benefits within the first week, 
      while others may need more time—it all depends on your body&apos;s unique needs, 
      vitamin levels, and health history. 
      Think of Immuno Boost Advance+ as a gradual investment in your long-term health, 
      where your body absorbs and utilizes nutrients over time for lasting results.
      </p>

      <h2 className="text-xl md:text-2xl font-bold bg-yellow-500 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500 text-white p-6 mt-12 text-center flex items-center justify-center gap-2">
      HOW TO GET STARTED
      </h2>
      <p className="text-xl md:text-2xl mt-6 text-center font-bold">
        Just follow these 3 easy steps:
      </p>

      <Card className="flex flex-col md:flex-row gap-4 p-6 border-yellow-400 border-2 hover:border-transparent rounded-2xl shadow-lg mt-12 ">
  {/* Left Description Section */}
  <CardContent className="flex flex-col justify-center text-center md:text-left">
    <h3 className="text-2xl font-bold mb-4 uppercase">Step No. 1</h3>
    <p className="mb-4 font-bold">Fill up the referral form.</p>
    <p>Get started by submitting your basic details.</p>
  </CardContent>

  {/* Right Image Section */}
      <Image
        src="/images/step-1.png"
        alt="Step 1"
        width={450}
        height={450}
        className="rounded-xl object-cover transition-transform hover:scale-200"
      />

</Card>

<Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-2 hover:border-transparent rounded-2xl shadow-lg mt-12 ">
  {/* Left Image Section */}
      <Image
        src="/images/step-2.png"
        alt="Step 2"
        width={450}
        height={450}
        className="rounded-xl object-cover transition-transform hover:scale-200"
      />


  {/* Right Description Section */}
  <CardContent className="flex flex-col justify-center text-center md:text-left">
    <h3 className="text-2xl font-bold mb-4 uppercase">Step No. 2</h3>
    <p className="mb-4 font-bold">Cash In to your E-wallet</p>
    <p>Choose from convenient options like GCash, Bank Transfer, or USDT to fund your account.</p>
  </CardContent>
</Card>

<Card className="flex flex-col md:flex-row gap-4 p-6  border-yellow-400 border-2 hover:border-transparent rounded-2xl shadow-lg mt-12 ">
  {/* Left Description Section */}
  <CardContent className="flex flex-col justify-center text-center md:text-left">
    <h3 className="text-2xl font-bold mb-4 uppercase">Step No. 3</h3>
    <p className="mb-4 font-bold">Purchase your desired packages</p>
    <p>Use your e-wallet to buy your first Immuno Boost Advance+ package and start enjoying the benefits immediately.</p>
  </CardContent>

  {/* Right Image Section */}
      <Image
        src="/images/step-3.png"
        alt="Step 3"
        width={450}
        height={450}
        className="rounded-xl object-cover"
      />
  </Card>

  <h2 className="text-xl md:text-2xl font-bold bg-yellow-500 hover:bg-gradient-to-r hover:from-red-400 hover:to-yellow-500 text-white p-4 mt-12 text-center flex items-center justify-center gap-2">
      JOIN <span className="underline">{formatNumber(updatedUsersCount)}</span> HAPPY CUSTOMERS
    </h2>

    <div className="relative rounded-lg group flex justify-center items-center">
      <Image
        src="/images/happy-customers.png"
        alt="Join Thousands of Happy Customers"
        width={900}
        height={900}
        className="object-cover rounded-b-lg rounded-t-none filter grayscale group-hover:grayscale-0 transition-all duration-300"
      />
    </div>

      <div className='mt-6'>
      <ol className="space-y-6">
          {[
            { title: "Zero Membership Fees", description: "Just purchase any product package to unlock all iGift services. No hidden costs or monthly dues." },
            { title: "33% Lifetime Product Discounts", description: "Save on every order and keep more money in your pocket forever." },
            { title: "FREE $1,000 Replicated Sales Landing Page", description: "Get a professional, ready-to-use sales page to grow your business and generate income effortlessly." },
            { title: "FREE $500 Sales & Personal Development Training", description: "Gain proven strategies from the 'Success Made Simple Formula' to grow your career and confidence." },
            { title: "FREE $199 Lifetime Access to iGift Learn", description: "Connect with growth-focused individuals and expand your knowledge to scale your business." },
            { title: "FREE $20/Month Access to iGift Care", description: "Consult doctors anytime and stay on top of your health without breaking the bank." },
            { title: "Continuous Health & Income Education", description: "Stay informed, healthy, and empowered with ongoing health and wealth creation education." },
            { title: "8 Proven Ways to Earn", description: "Unlock multiple income streams and build lasting financial stability." }
          ].map((item, index) => (
            <li key={index} className="flex items-start space-x-6">
              <div className="w-4 h-4 flex items-center justify-center bg-yellow-400 font-bold rounded-full p-4">
                {index + 1}
              </div>
              <p>
                <span className="font-semibold text-lg md:text-xl">{item.title}</span> <br />{item.description}
              </p>
            </li>
          ))}
        </ol>
        </div>

        <div className="relative rounded-lg group flex justify-center items-center mt-4 shadow-lg">
      <Image
        src="/images/orders.png"
        alt="We deliver orders via J&T Express & DHL Express"
        width={900}
        height={900}
        className="object-cover rounded-lg filter dark:grayscale dark:opacity-75 dark:hover:opacity-100 dark:group-hover:grayscale-0 transition-all duration-300"
      />
      </div>

        <h2 className='text-4xl md:text-5xl font-bold text-center mt-16'>Frequently Asked Questions</h2>
        <FrequentlyAskedQuestions />
      

        {/* AFFILIATE LINK */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-50">
          <Link href={referral.affiliateLink} target="_blank">
          <Button className="p-8 text-xl uppercase rounded-none font-bold w-full text-white hover:text-black bg-realGreen hover:bg-gold">
            FILL UP THE FORM TO GET STARTED
          </Button>

          </Link>
        </div>


      </div>



      </div>

      <footer className="bg-yellow-100 dark:bg-neutral-600  p-4 text-sm text-center mx-auto w-full mt-24 pb-36 rounded">
        <p className="max-w-3xl text-center justify-center mx-auto pt-12">
          <span className='font-bold text-yellow-500 dark:text-neutral-500'>**</span>
          These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. 
          Please consult your healthcare provider before starting any dietary supplement, especially if you are pregnant, nursing, or have a pre-existing medical condition.
          <span className='font-bold text-yellow-500 dark:text-neutral-500'>**</span>
        </p>
        <p className="mt-12 mb-36">© 2023 - 2025 iGift®. All Rights Reserved.</p>
      </footer>
    </> );
}
 
export default AffiliateHealthSalesPage;