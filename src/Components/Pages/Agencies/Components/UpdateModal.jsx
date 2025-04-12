import React, { useRef } from "react";
import useClickOutsideTarget from "../../../../hooks/useClickOutsideTarget";

function UpdateModal({ agency, setInitialAgencies, setUpdateModal }) {
    const { id } = agency;

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
    const [initialAgency, setInitialAgency] = React.useState(agency);
    const modalRef = useRef(null);
    useClickOutsideTarget(modalRef, () => setUpdateModal(false));

    return (
        <div
            className='modal'
            ref={modalRef}
        >
            <div
                className='quit'
                onClick={() => setUpdateModal(false)}
            >
                ×
            </div>
            <div className='modal-title'>Update Agency ID {id}</div>
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
                                    value={initialAgency[key]}
                                    onChange={(e) =>
                                        setInitialAgency((prev) => ({
                                            ...prev,
                                            [key]: e.target.value,
                                        }))
                                    }
                                />
                            ) : key === "status" ? (
                                <input
                                    checked={initialAgency[key] === 1}
                                    type='checkbox'
                                    onChange={(e) =>
                                        setInitialAgency((prev) => ({
                                            ...prev,
                                            [key]: e.target.checked ? 1 : 0,
                                        }))
                                    }
                                />
                            ) : (
                                <input
                                    type={key === "start" ? "date" : "text"}
                                    value={initialAgency[key]}
                                    onChange={(e) =>
                                        setInitialAgency((prev) => ({
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
                    onClick={() => setUpdateModal(false)}
                    className='modal-button cancel'
                >
                    Cancel
                </button>
                <button
                    className='modal-button confirm'
                    onClick={() => {
                        setInitialAgencies((prev) =>
                            prev.map((item) => (item.id === id ? initialAgency : item)),
                        );
                        setUpdateModal(false);
                    }}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default UpdateModal;
