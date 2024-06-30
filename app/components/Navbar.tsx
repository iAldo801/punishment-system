import Link from "next/link";


export default function Navbar() {

    return (

        <nav className="bg-primary text-white flex justify-between items-center py-5 px-8">

            <Link className="hover:bg-background py-3 px-6 rounded-md" href={"/ban/list"}>

                <button>

                    Ban List

                </button>

            </Link>

        </nav>

    )

}