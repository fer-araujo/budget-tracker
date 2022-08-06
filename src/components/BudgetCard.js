import React, { useState, useEffect } from "react";
import { currencyFormatter } from "../utilities/Utilities";

function BudgetCard({ name, amount, max }) {
  const [fill, setFill] = useState(0);
  const [color, setColor] = useState("bg-gray-600");
  const [background, setBackground] = useState("bg-gray-400/40");

  useEffect(() => {
    let ratio = amount / max;
    setFill(ratio * 100);
    if (ratio < 0.5) {
      setColor("bg-green-600");
      setBackground("bg-white/80");
    } else if (ratio < 0.89) {
      setColor("bg-yellow-600");
      setBackground("bg-yellow-400/30");
    } else if (ratio >= 0.9) {
      setColor("bg-red-600");
      setBackground("bg-red-400/30");
    }
  }, [amount, max]);

  return (
    <div
      className={`px-6 py-4 min-w-full transition ease-in-out delay-150 border border-gray-400/40 ${background} rounded-lg shadow-lg `}
    >
      <div className="flex justify-between items-baseline mb-3">
        <h5 className="mr-2 text-xl font-semibold tracking-tight text-gray-900">
          {name}
        </h5>

        <div className="flex items-baseline font-semibold">
          {currencyFormatter.format(amount)}
          <span className="text-gray-600 text-sm ml-1">
            / {currencyFormatter.format(max)}
          </span>
        </div>
      </div>
      <div className="flex justify-evenly items-center mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
          <div
            className={`${color} h-2.5 rounded-full`}
            style={{ width: `${fill}%`, transition: "width 1.5s" }}
          ></div>
        </div>
      </div>
      <div className=" w-full flex justify-end">
        <button className="w-auto flex justify-center items-center px-2 h-10 leading-none sm:h-8 border border-green-700 text-green-700 font-normal rounded">
          Add Expense
        </button>
        <button className="w-auto flex justify-center items-center px-2 h-10 leading-none sm:h-8 ml-2 border border-gray-700 text-gray-700 font-normal rounded">
          View Expenses
        </button>
      </div>
    </div>
  );
}

export default BudgetCard;
