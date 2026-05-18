"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import AddCategoryModal from "../../../component/AddCategoryModal";

export default function Category() {

    const [showModel, setShowModel] = useState(false);

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {

        try {

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/category`
            );

            setCategories(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteCategory = async (id) => {

        try {

            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`
            );

            setCategories((prev) =>
                prev.filter((item) => item._id !== id)
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        getCategories();
    }, []);

    // Different colors for cards
    const colors = [
        "primary",
        "success",
        "danger",
        "warning",
        "info",
        "secondary",
    ];

    // Different icons
    const icons = [
        "ri-gallery-view-2",
        "ri-image-line",
        "ri-folder-image-line",
        "ri-camera-lens-line",
        "ri-slideshow-line",
        "ri-landscape-line",
    ];

    return (

        <div className="container-fluid px-0">

            <div className="card p-4">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h3 className="mb-0 fw-bold">
                        All Categories
                    </h3>

                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModel(true)}
                    >
                        + Add Category
                    </button>

                </div>

                {/* Modal */}
                {showModel && (

                    <AddCategoryModal
                        onClose={() => setShowModel(false)}
                        refreshCategories={getCategories}
                    />

                )}

                {/* Category Cards */}
                <div className="row">

                    {Array.isArray(categories) &&
                        categories.map((item, index) => {

                            const color = colors[index % colors.length];
                            const icon = icons[index % icons.length];

                            return (

                                <div
                                    className="col-xl-3 col-lg-4 col-md-6 mb-4"
                                    key={item._id}
                                >

                                    <div
                                        className="card shadow-sm border-0 h-100"
                                        style={{
                                            borderRadius: "16px",
                                        }}
                                    >

                                        <div className="card-body">

                                            <div className="d-flex justify-content-between align-items-start">

                                                {/* Left Side */}
                                                <div className="d-flex align-items-center">

                                                    <div className="avatar me-3">

                                                        <div
                                                            className={`avatar-initial bg-${color} bg-opacity-10 text-${color} rounded-3 d-flex align-items-center justify-content-center`}
                                                            style={{
                                                                width: "60px",
                                                                height: "60px",
                                                                fontSize: "28px",
                                                            }}
                                                        >
                                                            <i className={icon}></i>
                                                        </div>

                                                    </div>

                                                    <div>

                                                        <h5 className="mb-1 fw-semibold">
                                                            {item.name}
                                                        </h5>

                                                        <small className="text-muted">
                                                            Category #{index + 1}
                                                        </small>

                                                    </div>

                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => {

                                                        if (window.confirm("Delete this category?")) {
                                                            deleteCategory(item._id)
                                                        }

                                                    }}
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                </div>

            </div>

        </div>

    );

}