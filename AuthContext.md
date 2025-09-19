# 🛡️ React 19 Auth Context Setup (Full Guide)

This guide shows how to create and use **Auth Context** in React 19 to manage authentication globally.

---

## 1. Create the Auth Context

📄 **AuthContext.jsx**

```jsx
import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create Context
const AuthContext = createContext();

// 2️⃣ Create Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext value={{ user, setUser }}>
      {children}
    </AuthContext>
  );
}

// 3️⃣ Create Custom Hook (for easier usage)
export function useAuth() {
  return useContext(AuthContext);
}
```


# 2. Wrap Your App with the Provider
**main.jsx**
``` bash
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```



# 3. Use Auth Anywhere in Your App

**Now, whenever you need authentication data (user) or want to update it (setUser), simply:**

``` bash
import { useAuth } from "./AuthContext";

function SomeComponent() {
  const { user, setUser } = useAuth();

  return (
    <div>
      {user ? <p>Welcome, {user.username}</p> : <p>Please log in</p>}
    </div>
  );
}

```