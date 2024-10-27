import React from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

const UsersPage = async () => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {cache: "no-store"}
    );
    const users: User[] = await res.json();

      
        
        
    return(
    <>
    <h1>Users</h1>
    <p>{new Date().toLocaleTimeString()}</p>
    <table className="table table-fixed">
        <thead className="bg-gray-800 text-white text-sm uppercase">
            <tr >
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
            </tr>
        </thead>
        <tbody> 
            {users.map((user) => (
            <tr key={user.id}>
                <td className="px-4 py-5">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
            </tr>
       
        ))}
        </tbody>
    </table>
    </>
    )
};

export default UsersPage;
