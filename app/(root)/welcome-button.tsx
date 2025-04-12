import Link from 'next/link';
import {auth} from '@/auth';
import { Button } from '@/components/ui/button';
import { ChevronRight, UserIcon} from "lucide-react";

const WelcomeButton = async () => {
    const session = await auth();

    if (!session) {
        return (
    <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
      <Button asChild className='px-6 py-3 text-lg text-black bg-yellow-400 hover:bg-yellow-300 border-none rounded-xl' variant='outline'>
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
        )
    }

    return (<div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
    <Button asChild className='px-6 py-4 uppercase text-xl text-black bg-yellow-400 hover:bg-yellow-300 border-none rounded-xl' variant='outline'>
          <Link href='/dashboard'>
           Back to Dashboard <ChevronRight size={64} />
          </Link>
    </Button>
        </div>
    );
}
 
export default WelcomeButton;