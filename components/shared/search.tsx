import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

const Search = () => {

    return (<form action='/search' method="GET">
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
            name="q"
            type="text"
            placeholder="Search..."
            className="w-full rounded-full"
            />
            <Button variant='default' className="rounded-full">
                <SearchIcon />
            </Button>
        </div>
    </form> );
}
 
export default Search;