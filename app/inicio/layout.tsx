"use client";

import React from "react";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}

export default Layout;