import { Card, CardContent } from "@/components/ui/card";
import { getAffiliateLinkByReferralCode } from "@/lib/actions/affiliate.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";



export const metadata: Metadata = {
    title: 'Health'
}

const HealthListPage = async (props: 
    {params: Promise<{referralCode: string}>
}) => {

    const {referralCode} = await props.params;

    const referral = await getAffiliateLinkByReferralCode(referralCode);

    if(!referral) notFound();
    
    return ( <>
    <div className="text-left mx-auto max-w-full sm:max-w-3xl">
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
    </div>
    </> );
}
 
export default HealthListPage;