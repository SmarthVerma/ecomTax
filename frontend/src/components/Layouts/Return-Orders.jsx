import { Link } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';

const ReturnOrders = () => {
    const { isLoading, data: user } = useAuthContext();

    console.log(user);

    return (
        <>
            {(user?.role === 'user' || user?.role === 'admin' || user?.role === 'owner') && (
                <div className="w-max">
                    <Link to={'/myorders'}>
                        <div className="hover:outline p-2">
                            <p className="text-xs">Return</p>
                            <span className="font-bold">& Orders</span>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export default ReturnOrders;