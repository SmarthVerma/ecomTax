import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReturnOrders = () => {
    const {isLoading, data: user} = useSelector(state => state.user)

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