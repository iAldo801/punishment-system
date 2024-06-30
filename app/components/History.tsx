'use client'

import { Skeleton } from "@/components/ui/skeleton"
import axios, { AxiosError } from "axios"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "react-query"

interface User {
    username: string;
    avatar: string;
    banner: string;
    tempBanCount: number;
    banCount: number;
    muteCount: number;
    kickCount: number;
}

export default function History() {
    const { data: users, isLoading, isError } = useQuery<User[]>("users", fetchUsers);

    async function fetchUsers() {
        const response = await axios.get("/api/getUsers", {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        });
        const updatedUsers = response.data.map((user: any) => {

            const banTypes = ['BAN', 'TEMPBAN'];
            const muteTypes = ['MUTE', 'TEMPMUTE'];

            const banCount = user.punishments.filter((punishment: any) => banTypes.includes(punishment.type)).length;
            const muteCount = user.punishments.filter((punishment: any) => muteTypes.includes(punishment.type)).length;
            const kickCount = user.punishments.filter((punishment: any) => punishment.type === "KICK").length;
            return { ...user, banCount, muteCount, kickCount };
        });
        return updatedUsers;
    }

    if (isLoading) {
        return (

            <main className="bg-background flex justify-center items-center min-h-screen font-grotesk select-none">

                <div className="cards-parent grid grid-cols-1 md:grid-cols-2 text-white gap-5">

                    <div className="cards-child bg-primary shadow-lg rounded-lg px-6 py-7">

                        <div className="images rounded-md">

                            <Skeleton className="bg-gray-400 w-[500px] h-[200px] rounded-md" />

                            <div className="flex justify-center items-center ">

                                <Skeleton className="bg-gray-400 w-[128px] h-[128px] rounded-full -mt-16" />

                            </div>

                        </div>


                        <div className="flex justify-center items-center mb-1">

                            <Skeleton className="bg-gray-400 w-32 h-8 rounded-md mt-3" />

                        </div>

                        <div className="font-medium buttons flex justify-center items-center py-5 space-x-5">


                            <button className="bg-red-700 hover:bg-red-800 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                Bans <br /> <Skeleton className="bg-gray-400 w-8 h-8" />
                            </button>



                            <button className="bg-slate-500 hover:bg-slate-600 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                Mutes <br /> <Skeleton className="bg-gray-400 w-8 h-8" />
                            </button>



                            <button className="bg-red-500 hover:bg-red-700 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                Kicks <br /> <Skeleton className="bg-gray-400 w-8 h-8" />
                            </button>

                        </div>

                    </div>

                    <div className="cards-child bg-primary shadow-lg rounded-lg px-6 py-7">

                        <div className="images rounded-md">

                            <Skeleton className="bg-gray-400 w-[500px] h-[200px] rounded-md" />

                            <div className="flex justify-center items-center ">

                                <Skeleton className="bg-gray-400 w-[128px] h-[128px] rounded-full -mt-16" />

                            </div>

                        </div>


                        <div className="flex justify-center items-center mb-1">

                            <Skeleton className="bg-gray-400 w-32 h-8 rounded-md mt-3" />

                        </div>

                        <div className="font-medium buttons flex justify-center items-center py-5 space-x-5">


                            <button className="bg-red-700 hover:bg-red-800 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                Bans <br /> <Skeleton className="bg-gray-400 w-8 h-8" />
                            </button>



                            <button className="bg-slate-500 hover:bg-slate-600 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                Mutes <br /> <Skeleton className="bg-gray-400 w-8 h-8" />
                            </button>



                            <button className="bg-red-500 hover:bg-red-700 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                Kicks <br /> <Skeleton className="bg-gray-400 w-8 h-8" />
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        )
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    return (

        <main className="bg-background flex justify-center items-center min-h-screen font-grotesk select-none">

            <div className="cards-parent grid grid-cols-1 md:grid-cols-2 text-white gap-5">

                {users.map((user) => (

                    <div className="cards-child bg-primary shadow-lg rounded-lg px-6 py-7">

                        <div className="images">

                            <Image
                                className="w-[500px] h-[200px] rounded-md object-cover"
                                src={user.banner}
                                alt=""
                                width={300}
                                height={800}
                            />

                            <div className="flex justify-center items-center">

                                <Image
                                    className="rounded-full relative -top-16 border-4 border-background"
                                    src={user.avatar}
                                    alt={user.username}
                                    width={128}
                                    height={128}
                                />

                            </div>

                        </div>

                        <div className="text -mt-12">

                            <h1 className="text-white text-2xl font-bold text-center">
                                {user.username}
                            </h1>

                        </div>

                        <div className="font-medium buttons flex justify-center items-center py-5 space-x-5">

                            <Link href={{ pathname: '/history/ban', query: { user: user.username } }}>

                                <button className="bg-red-700 hover:bg-red-800 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                    Bans <br /> {user.banCount}
                                </button>

                            </Link>

                            <Link href={{ pathname: '/history/mute', query: { user: user.username } }}>

                                <button className="bg-slate-500 hover:bg-slate-600 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                    Mutes <br /> {user.muteCount}
                                </button>

                            </Link>

                            <Link href={{ pathname: 'history/kick', query: { user: user.username } }}>

                                <button className="bg-red-500 hover:bg-red-700 rounded-lg px-12 py-1 text-center text-sm transition-all duration-500">
                                    Kicks <br /> {user.kickCount}
                                </button>

                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        </main>

    )

}
