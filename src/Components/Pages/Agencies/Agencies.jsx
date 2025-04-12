import React, { useEffect, useState } from "react";
import { debounce } from "../../../utils/functions";
import { AGENCIES } from "../../../utils/constants";
import "./Agencies.sass";
import TabeRow from "./Components/TabeRow";
import UpdateModal from "./Components/UpdateModal";
import AddModal from "./Components/AddModal";

function Agencies() {
    const [initialAgencies, setInitialAgencies] = useState(AGENCIES);
    const [agencies, setAgencies] = useState(AGENCIES);
    const [searchTerm, setSearchTerm] = useState("");
    const [updateModal, setUpdateModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    useEffect(() => {
        const filteredAgencies = initialAgencies.filter((agency) => {
            const { name, category, address, city, country, account_ids } = agency;
            const searchLower = searchTerm.toLowerCase();
            return (
                name.toLowerCase().includes(searchLower) ||
                category.toLowerCase().includes(searchLower) ||
                address.toLowerCase().includes(searchLower) ||
                city.toLowerCase().includes(searchLower) ||
                country.toLowerCase().includes(searchLower) ||
                account_ids.some((id) => id.includes(searchTerm))
            );
        });
        debounce(() => {
            if (searchTerm.replaceAll(" ", "") !== "") {
                setAgencies(filteredAgencies);
            } else {
                setAgencies(initialAgencies);
            }
        }, 250)();
    }, [searchTerm, initialAgencies]);

    return (
        <div className='agencies general-wrapper'>
            {updateModal && (
                <UpdateModal
                    agency={updateModal}
                    setInitialAgencies={setInitialAgencies}
                    setUpdateModal={setUpdateModal}
                />
            )}
            {addModal && (
                <AddModal
                    setInitialAgencies={setInitialAgencies}
                    setAddModal={setAddModal}
                />
            )}
            <div className='search-bar'>
                <div
                    className='add-agency ui__display-center'
                    onClick={() => setAddModal(true)}
                >
                    <span>Add Agency</span>
                </div>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className='table-wrapper'>
                <table>
                    <thead>
                        <tr>
                            <th>ID:</th>
                            <th>Name:</th>
                            <th>Category:</th>
                            <th>Accounts:</th>
                            <th>Start:</th>
                            <th>Address:</th>
                            <th>Status:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agencies &&
                            agencies.length > 0 &&
                            agencies.map((agency, index) => (
                                <TabeRow
                                    key={index}
                                    agency={agency}
                                    searchTerm={searchTerm}
                                    setUpdateModal={setUpdateModal}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Agencies;
