'use client'

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "react-query";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import { Box, Modal } from "@mui/material";

export default function BanTable() {

    // RANDOM OR MUTATION THINGS

    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState('');

    const { data: bans, isLoading, isError, refetch } = useQuery("bans", fetchGuildBans);

    const removeBanMutation = useMutation((userId: string) => removeBan(userId), {
        onSuccess: () => {
            refetch();
        },
    });

    const addBanMutation = useMutation((userId: string) => addBan(userId), {
        onSuccess: () => {
            refetch();
        },
    });

    // --------------------------------------------------------------------------------------------------------------------------------

    // DATA FETCHING OR REQUESTS TO API's

    async function fetchGuildBans() {
        try {
            const response = await axios.get("/api/getGuildBans", {
                headers: {
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                },
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch guild bans");
        }
    }

    async function removeBan(userId: string) {
        try {
            await axios.delete(`/api/deleteGuildBan?userId=${userId}`);
            toast.success("🚫 Punishment System | The user has been succesfully unbanned!");
        } catch (error) {
            console.error(error);
        }
    }

    async function addBan(userId: string) {

        try {

            await axios.put(`/api/addGuildBan?userId=${userId}`);
            toast.success("🚫 Punishment System | The user has been succesfully banned!");

        } catch (error) {

            console.error(error);

        }

    }

    // --------------------------------------------------------------------------------------------------------------------------------

    // HANDLERS

    const handleRemoveBan = (userId: string) => {
        removeBanMutation.mutate(userId);
    };

    const handleAddBan = (e: any) => {
        setUserId(e.target.value);
    };

    const handleSubmitBan = (e: any) => {
        e.preventDefault();
        addBan(userId);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // --------------------------------------------------------------------------------------------------------------------------------

    // RENDERING

    if (isLoading) {
        return <div className="min-h-screen">Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    return (

        <main className="flex justify-center items-center min-h-screen font-grotesk select-none">

            <div className="container mx-auto">
                <div className="bg-primary p-4 rounded-xl shadow-2xl mb-5">
                    <div className="bg-background flex justify-center items-center py-3 px-4 text-white text-opacity-95 text-lg font-semibold rounded-md">

                        Ban List

                        <div className="inline-flex ml-auto">

                            <Tooltip title="Add user to ban list" arrow>

                                <h1>

                                    <AiOutlinePlusCircle onClick={handleOpen} className="text-white hover:text-green-600 hover:cursor-pointer duration-300 transition-all h-6 w-6" />

                                </h1>

                            </Tooltip>

                        </div>

                        <div className="flex items-center justify-center">

                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className="flex items-center justify-center outline-none"
                            >
                                <Box>

                                    <form onSubmit={handleSubmitBan} className='bg-primary flex flex-col p-16 rounded-md text-white font-grotesk'>

                                        <label className='font-extrabold text-2xl mb-1'>
                                            User ID
                                        </label>

                                        <input
                                            onChange={handleAddBan}
                                            value={userId}
                                            name="userId"
                                            placeholder="457245988516528138"
                                            type="text"
                                            className={"bg-primary text-base rounded-md mb-3 border border-gray-500 p-5 outline-none text-white"}
                                        />


                                        <div className='flex gap-3'>

                                            <button
                                                onClick={handleSubmitBan}
                                                type='submit'
                                                className='bg-green-700 hover:bg-green-800 rounded-md mt-3 px-6 py-3 transition-colors duration-300'>
                                                Submit
                                            </button>

                                        </div>

                                    </form>

                                </Box>
                            </Modal>

                        </div>

                    </div>

                    <div>
                        <div>
                            <div className="bg-background flex items-center py-2 px-3 rounded-md text-base font-semibold justify-between mt-3">
                                <div className="flex items-center">
                                    <div className="mr-10">
                                        <div className="flex justify-center">
                                            Username
                                        </div>
                                    </div>
                                    <div className="ml-32">
                                        Reason
                                    </div>
                                    <div className="ml-28">
                                        Type
                                    </div>
                                </div>
                            </div>

                            <div className="py-2">
                                {bans.map((ban: any) => (
                                    <div
                                        key={ban.user.id}
                                        className="flex items-center py-2 px-3 text-lg font-normal hover:bg-secondarybag/40 justify-between space-x-2 border border-r-0 border-l-0 border-t-borders border-b-borders"
                                    >
                                        <div className="flex items-center">
                                            <BsFillPersonFill className="m-1" />
                                            <div className="text-center w-10">
                                                {ban.user.username}
                                            </div>
                                            <div className="flex items-center ml-[11.2rem]">
                                                {ban.reason}
                                            </div>
                                            <div className="ml-[10.5rem]">
                                                BAN
                                            </div>
                                        </div>
                                        <div className="flex items-center">

                                            <div className="mr-10">

                                                <Tooltip title={`${ban.user.username} History`}>

                                                    <Link
                                                        href={{
                                                            pathname: "/history/ban",
                                                            query: { user: ban.user.username },
                                                        }}
                                                    >

                                                        <FaHistory className="text-white hover:text-blue-600 duration-300 transition-all h-5 w-5" />

                                                    </Link>

                                                </Tooltip>

                                            </div>

                                            <div>

                                                <Tooltip title="Remove Ban" placement="bottom" arrow>

                                                    <h1>

                                                        <IoMdRemoveCircleOutline
                                                            className="text-white hover:text-red-600 hover:cursor-pointer duration-300 transition-all h-6 w-6"
                                                            onClick={() => handleRemoveBan(ban.user.id)} />

                                                    </h1>

                                                </Tooltip>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toaster toastOptions={{ className: 'text-center', }} />

        </main >

    );
}


{/*

    TODO: [

        - Add tempban type and if it is tempban then add third colum with duration of it.

    ]
    

*/}