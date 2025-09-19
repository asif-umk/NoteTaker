// import React, { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch logged-in user on app load
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setLoading(false);
//           return;
//         }
//         const response = await fetch("http://localhost:5000/api/users/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Failed to fetch user");
//         const data = await response.json();
//         setUser(data);
//       } catch (err) {
//         console.error(err);
//         localStorage.removeItem("token");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext value={{ user, setUser, loading, logout }}>
//       {children}
//     </AuthContext>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true); 
   
    useEffect(()=>{
      const fetchUser = async ()=>{
        try{
          const token =localStorage.getItem("token"); 
          if(!token) {
            setLoading(false)
             return; 
          } 
          const res = await fetch('http://localhost:5000/api/users/me' , {
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          if(!res.ok) throw new Error("Error while fetching the user!"); 
          const data = await res.json(); 
          setUser(data); 
          
        }
        catch(err)
        {
          console.error(err.message); 
          localStorage.removeItem("token")
        }finally{
          setLoading(false)
        }
      }
      fetchUser(); 
    }, [])
    return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth()
{
    return useContext(AuthContext); 
}