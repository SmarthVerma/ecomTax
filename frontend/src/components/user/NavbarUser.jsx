import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogoutUser } from "@/hooks/useLogoutUser"
import { FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

export function NavbarUser() {
    const navigate = useNavigate()
    const {mutate: logout} = useLogoutUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-3">
                <FaUser className="text-2xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-28 bg-gray-900 flex flex-col  text-white border-none">
                <DropdownMenuItem>
                    <button type="button" className="flex-1 ml-auto" onClick={() => navigate('/profile')} >
                    Profile
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem className=' bg-red-700 font-bold'>
                    <button type="button" className="flex-1" onClick={ () => logout()}>
                    Log out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
