"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme card"
        >

            {/* LOGO */}
            <div className="app-brand demo mb-4">

                <Link
                    href="/dashboard"
                    className="app-brand-link d-flex align-items-center"
                >
                    <span className="app-brand-text demo menu-text fw-semibold ms-2">
                        Dashboard
                    </span>
                </Link>

            </div>

            <div className="menu-inner-shadow mt-3"></div>

            {/* MENU */}
            <ul className="menu-inner py-1">

                <li className="menu-item active ">
                    <Link href="/dashboard" className="menu-link">
                        <i className="menu-icon tf-icons ri-home-smile-line"></i>
                        <div>Dashboard</div>
                    </Link>
                </li>

                <li className="menu-item">
                    <Link href="/category" className="menu-link">
                        <i className="menu-icon tf-icons ri-layout-2-line"></i>
                        <div>Category</div>
                    </Link>
                </li>

                <li className="menu-item">
                    <Link href="/folders" className="menu-link">
                        <i className="menu-icon tf-icons ri-folder-line"></i>
                        <div>Folders</div>
                    </Link>
                </li>

                <li className="menu-item">
                    <Link href="/files" className="menu-link">
                        <i className="menu-icon tf-icons ri-file-list-line"></i>
                        <div>Files</div>
                    </Link>
                </li>

            </ul>

        </aside>
    );
}