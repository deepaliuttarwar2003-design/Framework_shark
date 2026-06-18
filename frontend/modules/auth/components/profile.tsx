'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from "../Api/UserSlice";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const userInfo = useSelector(
        (state: any) => state.user.userInfo
    );

    const handleLogout = () => {
        dispatch(logout());
        router.push('/auth');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Profile Page
            </h1>

            <p>Name: {userInfo?.name}</p>
            <p>Email: {userInfo?.email}</p>

            <button
                onClick={handleLogout}
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
            >
                Logout
            </button>
        </div>
    );
}