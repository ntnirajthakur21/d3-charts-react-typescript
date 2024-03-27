"use client";
import React from "react";
import BarChart from "./charts/BarChart";
import ExpenseLineChart from "./charts/ExpenseLineChart";

const HomePage = () => {
  return (
    <>
      <ExpenseLineChart />
      <BarChart />
    </>
  );
};

export default HomePage;
