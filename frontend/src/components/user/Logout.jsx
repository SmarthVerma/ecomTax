import { CiLogout } from "react-icons/ci";

const Logout = () => {
    const handleLogout = () => {
        // Implement your logout logic here
        console.log("User logged out");
    };

    return (
        <div>
            <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 flex items-center justify-center gap-2"
                onClick={() => document.getElementById('logout_modal').showModal()}
            >
                <CiLogout /> Logout
            </button>
            <dialog id="logout_modal" className="modal">
                <div className="modal-box bg-slate-800 text-white">
                    <h3 className="font-bold text-lg">Confirm Logout</h3>
                    <p className="py-4">Are you sure you want to log out?</p>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                handleLogout();
                                document.getElementById('logout_modal').close();
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            className="btn"
                            onClick={() => document.getElementById('logout_modal').close()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Logout;