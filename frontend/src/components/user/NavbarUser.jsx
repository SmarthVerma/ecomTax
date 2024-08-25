import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuthContext } from "@/context/AuthContext";

function NavbarUser() {
    const { isLoading, data: user } = useAuthContext();

    if (isLoading) {
        return <p>Loading...</p>; // Handle loading state
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">
                    <Avatar>
                        <AvatarImage src={user.avatar.url} alt="User Avatar" />
                        <AvatarFallback>user</AvatarFallback>
                    </Avatar>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
                <div className="mt-4 flex flex-col space-y-2">
                    <Button variant="outline" className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                        Your Account
                    </Button>
                    <Button variant="outline" className="w-full bg-red-600 hover:bg-red-500 text-white">
                        Logout
                    </Button>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}

export { NavbarUser };