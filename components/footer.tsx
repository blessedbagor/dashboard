import { APP_NAME } from "@/lib/constants";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
    <footer className="border-t">
        <div className="p-5 flex-center text-sm">
        © 2023 - {`${currentYear}`} {`${APP_NAME} Marketing Innovation Technology Inc`}. All Rights Reserved.
        </div>
    </footer>
    );
}
 
export default Footer;