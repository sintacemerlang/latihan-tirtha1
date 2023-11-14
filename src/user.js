import React, { useCallback, useEffect, useId } from "react";
import axios from 'axios';
import { nanoid } from "nanoid";
import { useState } from 'react';

function UserPage() {
    const [allUsers, setAllUser] = useState([])
    const [isInit, setInit] = useState(true)
    const getData = useCallback(() => {
        (async () => {
            const { data } = await axios.get('http://localhost:8000/api/getAllUser')
            setInit(false)
            console.log(data.data)
            setAllUser(data.data)
        })()
    }, [])

    useEffect(() => {
        if (isInit) {
            getData()
        }
    }, [getData, isInit])

    const columns = [
        {
            name: 'Nama',
            selector: row => row.nama,
            sortable: true,
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Level',
            selector: row => row.level,
            sortable: true,
        },
    ];

    return (
        <div>
            <header>
                <nav>
                    <h2>User Page</h2>
                </nav>
            </header>
            <main>
                <table className="data">
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>username</td>
                            <td>nama</td>
                            <td>level</td>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={nanoid(7)}>
                                <td>{user.id_user}</td>
                                <td>{user.username}</td>
                                <td>{user.nama}</td>
                                <td>{user.level}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default UserPage