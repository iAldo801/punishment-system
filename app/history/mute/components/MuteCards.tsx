'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Punishment {
    staff: string;
    reason: string;
    date: string;
    type: string;
    duration?: string;
}

export default function MuteCards() {
    const [user, setUser] = useState<string | null>(null);
    const [punishments, setPunishments] = useState<Punishment[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get("user");

        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/getUsers");
                const userData = response.data.find(
                    (userData: any) => userData.username === username
                );
                if (userData) {
                    setUser(userData.username);

                    const punishmentTypes = ["MUTE", "TEMPMUTE"];

                    const filteredPunishments = userData.punishments.filter(
                        (punishment: any) => punishmentTypes.includes(punishment.type)
                    );

                    const mappedPunishments = filteredPunishments.map(
                        (punishment: any) => {
                            if (punishment.type === "TEMPMUTE") {
                                return {
                                    ...punishment,
                                    duration: punishment.duration,
                                };
                            }
                            return punishment;
                        }
                    );

                    setPunishments(mappedPunishments);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, []);

    document.title = `${user} Mute History - Hex Bot`;

    return (
        <div className="bg-background font-grotesk text-white min-h-screen">
            <header className="mb-5">
                <div className="bg-primary p-16 text-center">
                    <h1 className="text-4xl">{user} Mute History</h1>
                </div>
            </header>

            <main className="flex justify-center p-32">
                <div className="cards-parent grid grid-cols-1 md:grid-cols-4 text-white gap-5">
                    {punishments.map((punishment) => (
                        <div className="cards-child bg-primary shadow-lg rounded-lg px-6 py-7">
                            <Image
                                className="rounded-md"
                                src="/mute_banner.png"
                                alt=""
                                width={400}
                                height={400}
                            />
                            <div className="text mt-3">
                                <h1 className="text-xl">Staff: {punishment.staff}</h1>
                                <h1 className="text-xl">Reason: {punishment.reason}</h1>
                                {punishment.type === "TEMPMUTE" && (
                                    <h1 className="text-xl">Duration: {punishment.duration}</h1>
                                )}
                                <h1 className="text-xl">Date: {punishment.date}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
