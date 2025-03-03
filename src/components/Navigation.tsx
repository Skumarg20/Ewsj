"use client"
import { NAVIGATION } from "@/app/screen/dashboard";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import ProfileDropdown from "./profiledropdown";
import TimerModal from "@/app/components/TimeModel";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { useRouter } from "next/navigation";

function NavbarItem({
    item,
    pathname,
    // navigate,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
    pathname?: string;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter()
    const isActive =
        pathname === `/${item.segment}` ||
        (item.children && pathname?.startsWith(`/${item.segment}/`));
    
    

    return (
        <div className="relative">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    if (item.children) setIsOpen(!isOpen);
                    // router.push(item.segment)
                    else router.push(item.segment)
                }}
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors ${isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-100"
                    }`}
            >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="text-sm font-semibold">{item.title}</span>
            </motion.div>
            {item.children && isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="ml-6 mt-2 space-y-2"
                >
                    {item.children.map((
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        child: any
                    ) => (
                        <motion.div
                            key={child.segment}
                            whileHover={{ scale: 1.05 }}
                            // onClick={() => navigate(`/group/${child.segment}`)}
                            className={`flex items-center p-2 rounded-lg cursor-pointer ${pathname === `/group/${child.segment}`
                                ? "bg-purple-500 text-white"
                                : "text-gray-600 hover:bg-purple-100"
                                }`}
                        >
                            <span className="text-lg mr-2">{child.icon}</span>
                            <span className="text-sm">{child.title}</span>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}


const Navigation = () => {
    const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);
    
    React.useEffect(() => {
        setIsMounted(true);
        setIsNavbarOpen(true); // Show navbar after mount
    }, []);
    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

    return (
        <div>
            {isMounted && (
                <motion.div
                    initial={{ x: isNavbarOpen ? 0 : -250 }}
                    animate={{ x: isNavbarOpen ? 0 : -250 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl rounded-r-2xl p-4 flex flex-col justify-between z-20"
                >
                    <div className="space-y-2 mt-14">
                        {NAVIGATION.map((item, index) =>
                            item.segment ? (
                                <NavbarItem
                                    key={index}
                                    item={item}
                                />
                            ) : null
                        )}
                    </div>
                </motion.div>
            )}

            <div className="bg-white shadow-md p-2 flex justify-evenly items-center sticky top-0 z-30">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleNavbar}
                            className="text-indigo-600 text-xl hover:text-indigo-800 transition-colors p-2 rounded-full bg-indigo-50"
                            aria-label={isNavbarOpen ? "Hide Navbar" : "Show Navbar"}
                        >
                            {isNavbarOpen ? <IoIosClose /> : <IoIosMenu />}
                        </motion.button>
                        <div className="flex items-center">
                            <Image
                                src="https://ewsj12.s3.ap-south-1.amazonaws.com/coginest-logo+(1).png"
                                width={32} // Add width (required)
                                height={32} // Add height (required)
                                alt="Coginest"
                                className="h-8 w-auto mr-2"
                            />
                            <h1 className="text-lg font-bold text-indigo-600">
                                Coginest
                            </h1>
                        </div>
                    </div>

                    <div>
                        <ProfileDropdown />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <TimerModal />
                </div>
            </div>
        </div>
    )
}

export default Navigation