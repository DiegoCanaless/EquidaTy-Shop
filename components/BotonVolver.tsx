"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function BotonVolver({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    const router = useRouter();

    function volver() {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    }

    return (
        <button type="button" onClick={volver} className={className}>
            {children}
        </button>
    );
}
