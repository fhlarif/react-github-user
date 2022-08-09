import React, { useState, useEffect } from "react";

const GithubUsers = () => {
  const url = "https://api.github.com/users";
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  let callOnce = true;

  const getUsers = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (callOnce) {
      getUsers();
    }
    return () => {
      callOnce = false;
    };
  }, []);

  return (
    <div className="relative">
      <h1 className="text-5xl tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-yellow-500 capitalize container my-10">
        GitHub Users
      </h1>
      {isLoading && (
        <div className="flex h-screen justify-center items-center bg-gray-900 opacity-25 absolute top-0 inset-0 ">
          <span className="text-lg">Loading....</span>
        </div>
      )}
      <section className="self-center my-32 grid lg:grid-cols-3 gap-4 mx-3">
        {error ? (
          <h4 className="text-xl text-red-500">Something went wrong</h4>
        ) : (
          users.length > 0 &&
          users.map((user) => {
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
          })
        )}
      </section>
    </div>
  );
};

export default GithubUsers;
