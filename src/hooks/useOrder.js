// Updated useOrder hook
import { useState, useEffect } from "react";
export default function useOrder(initialItems = [], orderConfig = {}) {
  const {
    orderKey = "",
    orderDirection = "asc",
    orderOptions = [],
    storageKey = "order-preference",
  } = orderConfig;

  const getInitialOrder = () => {
    try {
      const savedOrder = localStorage.getItem(storageKey);
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder);
        // Validate saved order exists in options if options are provided
        if (orderOptions.length === 0 || orderOptions.includes(parsed.key)) {
          return parsed;
        }
      }
      return { key: orderKey, direction: orderDirection };
    } catch (error) {
      console.error("translation.error.localStorageAccess", error);
      return { key: orderKey, direction: orderDirection };
    }
  };

  const [currentOrder, setCurrentOrder] = useState(getInitialOrder);
  const [orderedItems, setOrderedItems] = useState(initialItems);

  const getValue = (obj, key) => {
    // Handle nested properties
    return key.split(".").reduce((o, k) => (o || {})[k], obj);
  };

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(currentOrder));
    } catch (error) {
      console.error("translation.error.localStorageSave", error);
    }

    if (!currentOrder.key) {
      setOrderedItems(initialItems);
      return;
    }

    const sortedItems = [...initialItems].sort((a, b) => {
      const valueA = getValue(a, currentOrder.key);
      const valueB = getValue(b, currentOrder.key);

      // Handle null/undefined cases
      if (valueA == null) return currentOrder.direction === "asc" ? 1 : -1;
      if (valueB == null) return currentOrder.direction === "asc" ? -1 : 1;
      if (valueA == null && valueB == null) return 0;

      // Handle different data types
      if (typeof valueA === "string" && typeof valueB === "string") {
        return currentOrder.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return currentOrder.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      if (valueA instanceof Date && valueB instanceof Date) {
        return currentOrder.direction === "asc"
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }

      // Fallback for other types
      return currentOrder.direction === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    setOrderedItems(sortedItems);
  }, [currentOrder, initialItems, storageKey]);

  const handleOrderChange = (key, direction) => {
    if (typeof key === "object") {
      // Handle event object from select
      const { value } = key.target;
      setCurrentOrder((prev) => ({
        key: value,
        direction:
          prev.key === value && prev.direction === "asc" ? "desc" : "asc",
      }));
      return;
    }

    if (direction) {
      setCurrentOrder({ key, direction });
      return;
    }

    setCurrentOrder((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const resetOrder = () => {
    setCurrentOrder({ key: orderKey, direction: orderDirection });
  };

  return {
    orderKey: currentOrder.key,
    orderDirection: currentOrder.direction,
    orderedItems,
    handleOrderChange,
    orderOptions,
    resetOrder,
  };
}
