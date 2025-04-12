import React, { useRef, useState } from "react";
import useClickOutsideTarget from "../../../../hooks/useClickOutsideTarget";

function AddModal({ setInitialAgencies, setAddModal }) {
    const [agency, setAgency] = useState({
        name: "",
        abbreviation: "",
        category: "",
        start: "",
        legal_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        notes: "",
        status: 0,
    });
    const fields = {
        name: "Name",
        abbreviation: "Abbreviation",
        category: "Category",
        start: "Start",
        legal_name: "Legal Name",
        email: "Email",
        phone: "Phone",
        address: "Address",
        city: "City",
        country: "Country",
        notes: "Notes",
        status: "Status",
    };
    const modalRef = useRef(null);

    useClickOutsideTarget(modalRef, () => setAddModal(false));

    return (
        <div
            className='modal'
            ref={modalRef}
        >
            <div
                className='quit'
                onClick={() => setAddModal(false)}
            >
                ×
            </div>
            <div className='modal-title'>Add new Agency</div>
            <div className='modal-content'>
                <div className='modal-content-body'>
                    {Object.keys(fields).map((key) => (
                        <div
                            key={key}
                            className='modal-content-row'
                        >
                            <span>{fields[key]}</span>
                            {key === "notes" ? (
                                <textarea
                                    value={agency[key]}
                                    onChange={(e) =>
                                        setAgency((prev) => ({
                                            ...prev,
                                            [key]: e.target.value,
                                        }))
                                    }
                                />
                            ) : key === "status" ? (
                                <input
                                    checked={agency[key] === 1}
                                    type='checkbox'
                                    onChange={(e) =>
                                        setAgency((prev) => ({
                                            ...prev,
                                            [key]: e.target.checked ? 1 : 0,
                                        }))
                                    }
                                />
                            ) : (
                                <input
                                    type={key === "start" ? "date" : "text"}
                                    value={agency[key]}
                                    onChange={(e) =>
                                        setAgency((prev) => ({
                                            ...prev,
                                            [key]: e.target.value,
                                        }))
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className='modal-buttons'>
                <button
                    onClick={() => setAddModal(false)}
                    className='modal-button cancel'
                >
                    Cancel
                </button>
                <button
                    className='modal-button confirm'
                    onClick={() => {
                        setInitialAgencies((prev) =>
                            prev.concat({
                                ...agency,
                                id: prev.length + 1,
                            }),
                        );
                        setAddModal(false);
                    }}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default AddModal;
