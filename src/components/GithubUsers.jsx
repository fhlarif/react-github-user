import React, { useState, useEffect } from "react";

const GithubUsers = () => {
  const url = "https://api.github.com/users";
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="">
      <h1 className="text-5xl tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-yellow-500 capitalize container my-10">
        GitHub Users
      </h1>
      <section className="self-center my-32 grid lg:grid-cols-3 gap-4 mx-3">
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          return (
            <div
              key={id}
              className="pl-2 pr-10 py-6  border-sky-300 rounded-lg border-2 flex gap-4 bg-sky-900 shadow-md shadow-sky-400 ">
              <img loading="lazy" src={avatar_url} alt={login} className="rounded-full w-32 h-32 ml-4" />
              <div className=" ml-5 flex gap-4 flex-col justify-start">
                <span className="text-xl  bg-clip-text text-transparent bg-gradient-to-br from-emerald-50 to-red-400">
                  {login}
                </span>
                <a href={html_url} target="_blank">
                  <button className="p-2 mt-3 shadow shadow-sky-300 rounded-xl bg-sky-700">View Profile</button>
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default GithubUsers;
