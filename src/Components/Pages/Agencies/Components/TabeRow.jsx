import React from "react";

function TabeRow({ agency, searchTerm, setUpdateModal }) {
    const { name, id, category, account_ids, start, status, address, city, country } = agency;
    const isSearchTerm = searchTerm.replaceAll(" ", "") !== "";

    function searchTermPresent(field) {
        return field.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return (
        <tr onClick={() => setUpdateModal(agency)}>
            <td>{id}</td>
            <td className={isSearchTerm && searchTermPresent(name) ? "highlight" : ""}>{name}</td>
            <td className={isSearchTerm && searchTermPresent(category) ? "highlight" : ""}>
                {category}
            </td>
            <td className={isSearchTerm && searchTermPresent(account_ids) ? "highlight" : ""}>
                {account_ids}
            </td>
            <td>{start}</td>
            <td
                className={
                    isSearchTerm &&
                    (searchTermPresent(address) ||
                        searchTermPresent(country) ||
                        searchTermPresent(city))
                        ? "highlight"
                        : ""
                }
            >
                {country}, {city}, {address}
            </td>
            <td className={status === 1 ? "status-active" : "status-inactive"}>
                {status === 1 ? "Active" : "Inactive"}
            </td>
        </tr>
    );
}

export default TabeRow;
