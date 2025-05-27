import React from "react";
import { useGroupedStores } from "../hooks/useGroupedStores";

const Home = () => {
  const stores = [
    {
      id: 1,
      name: "Welcome Store",
      address: "3100 N Main St, Taylor",
    },
    {
      id: 2,
      name: "welcome store",
      address: "3100 main N St, taylor",
    },
    { id: 3, name: "Welcome Store", address: "3535 4th St N, St. Petersburg" },
    {
      id: 30,
      name: "welcome store",
      address: "4844 Sun City Center Blvd, Sun City",
    },
    { id: 4, name: "Coffee Spot", address: "1217 E Ferguson Ave, Pharr" },
    { id: 5, name: "coffee spot", address: "3015 W Kennedy Blvd, Tampa" },
    { id: 6, name: "Another Shop", address: "500 5th Ave, NY" },
  ];

  const groupedStores = useGroupedStores(stores);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Store Merger Tool</h1>
      {groupedStores.map((group, idx) => (
        <div
          key={idx}
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            background: "#f9f9f9",
          }}
        >
          <h3>Group #{idx + 1}</h3>
          <ul>
            {group.map((store) => (
              <li key={store.id}>
                <strong>{store.name}</strong> — {store.address}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
