'use client'

import axios from "axios"
import Image from "next/image";
import { useEffect, useState } from "react"

interface Punishments {
    staff: string,
    reason: string,
    date: string,
}

export default function MuteCards() {

    const [user, setUser] = useState(null);
    const [Punishments, setPunishments] = useState<Punishments[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get('user');

        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/getUsers');
                const userData = response.data.find((userData: any) => userData.username === username);
                if (userData) {
                    setUser(userData.username);
                    const Punishments = userData.punishments.filter((punishment: any) => punishment.type === 'KICK');
                    setPunishments(Punishments);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, []);

    document.title = `${user} Kick History - Hex Bot`;

    return (

        <div className="bg-background font-grotesk text-white min-h-screen">

            <header className="mb-5">
                <div className="bg-primary p-16 text-center">

                    {/* <Link href='http://localhost' type='button' className='bg-tertiary hover:bg-tertiary/80 mb-10 rounded-md px-8 py-3 transition-all duration-500'>
                        <svg className='inline-block w-5 h-5 align-middle mr-1 mb-1' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                        </svg> Go back
                    </Link> */}

                    <h1 className="text-4xl">
                        {user} Kick History
                    </h1>

                </div>
            </header>

            <main className="flex justify-center p-32">

                <div className="cards-parent grid grid-cols-1 md:grid-cols-4 text-white gap-5">

                    {Punishments.map((punishment) => (
                        <div className="cards-child bg-primary shadow-lg rounded-lg px-6 py-7">

                            <Image
                                className="rounded-md"
                                src="/kick_banner.png"
                                alt=""
                                width={400}
                                height={400}
                            />

                            <div className="text mt-3">

                                <h1 className="text-xl">
                                    Staff: {punishment.staff}
                                </h1>
                                <h1 className="text-xl">
                                    Reason: {punishment.reason}
                                </h1>
                                <h1 className="text-xl">
                                    Date: {punishment.date}
                                </h1>

                            </div>

                        </div>
                    ))}

                </div>

            </main>

        </div>

    )

}