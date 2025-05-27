"use client";
import React, { useState, useEffect } from "react";
import { useGroupedStores } from "../hooks/useGroupedStores";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "store-merger-data";

interface Store {
  id: string;
  name: string;
  address: string;
}

const Home = () => {
  const [stores, setStores] = useState<Store[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const savedStores = localStorage.getItem(STORAGE_KEY);
      if (savedStores) {
        return JSON.parse(savedStores);
      }
    }
    // Default stores if no localStorage data
    return [
      {
        id: uuidv4(),
        name: "Welcome Store",
        address: "3100 N Main St, Taylor",
      },
      {
        id: uuidv4(),
        name: "welcome store",
        address: "3100 main N St, taylor",
      },
      {
        id: uuidv4(),
        name: "Welcome Store",
        address: "3535 4th St N, St. Petersburg",
      },
      {
        id: uuidv4(),
        name: "welcome store",
        address: "4844 Sun City Center Blvd, Sun City",
      },
      {
        id: uuidv4(),
        name: "Coffee Spot",
        address: "1217 E Ferguson Ave, Pharr",
      },
      {
        id: uuidv4(),
        name: "coffee spot",
        address: "3015 W Kennedy Blvd, Tampa",
      },
      { id: uuidv4(), name: "Another Shop", address: "500 5th Ave, NY" },
    ];
  });

  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
  });

  // Save to localStorage whenever stores change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
    }
  }, [stores]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStore((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStore.name && newStore.address) {
      setStores((prev) => [
        ...prev,
        {
          id: uuidv4(),
          name: newStore.name,
          address: newStore.address,
        },
      ]);
      setNewStore({ name: "", address: "" });
    }
  };

  const handleDelete = (storeId: string) => {
    setStores((prev) => prev.filter((store) => store.id !== storeId));
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all stores? This cannot be undone."
      )
    ) {
      setStores([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const groupedStores = useGroupedStores(stores);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>Store Merger Tool</h1>
        <button
          onClick={handleClearAll}
          style={{
            padding: "0.5rem 1rem",
            background: "#ff4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear All Stores
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
          background: "#fff",
        }}
      >
        <h3>Add New Store</h3>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Store Name:
            <input
              type="text"
              name="name"
              value={newStore.name}
              onChange={handleInputChange}
              style={{
                marginLeft: "0.5rem",
                padding: "0.5rem",
                width: "300px",
              }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Address:
            <input
              type="text"
              name="address"
              value={newStore.address}
              onChange={handleInputChange}
              style={{
                marginLeft: "0.5rem",
                padding: "0.5rem",
                width: "300px",
              }}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Store
        </button>
      </form>

      {groupedStores.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            background: "#f9f9f9",
            border: "1px solid #ccc",
          }}
        >
          <p>No stores added yet. Add your first store using the form above!</p>
        </div>
      ) : (
        groupedStores.map((group, idx) => (
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
            <ul style={{ listStyle: "none", padding: 0 }}>
              {group.map((store) => (
                <li
                  key={store.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div>
                    <strong>{store.name}</strong> — {store.address}
                  </div>
                  <button
                    onClick={() => handleDelete(store.id)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      background: "#ff4444",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
