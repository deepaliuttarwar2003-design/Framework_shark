
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const userInfo = useSelector(
        (state: RootState) => state.user.userInfo
    );

    useEffect(() => {
        if (!userInfo) {
            router.push("/user/login");
        }
    }, [userInfo, router]);

    if (!userInfo) {
        return <div>Loding....</div>;
    }

    return <>{children}</>;
}