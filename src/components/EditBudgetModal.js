import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { useBudgets } from "../context/BudgetsContext";

function EditBudgetModal({ handleClose, budgetName, budgetMax, id }) {
  const nameEditRef = useRef();
  const maxEditRef = useRef();
  const { editBudget } = useBudgets();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    editBudget({
      id: id,
      name: nameEditRef.current.value,
      max: parseFloat(maxEditRef.current.value),
    });

    handleClose();
  };
  return (
    <Dialog open={id !== null} onClose={handleClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-2xl w-full p-8 rounded bg-white">
          <Dialog.Title
            as="h1"
            className="text-2xl text-gray-800 font-bold my-4"
          >
            Edit Budget
          </Dialog.Title>
          <Dialog.Description as="div">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  ref={nameEditRef}
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  placeholder={`${budgetName}`}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="maximum"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Maximum Spending
                </label>
                <input
                  ref={maxEditRef}
                  type="number"
                  id="maximum"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  required
                  min={0}
                  step={0.01}
                  placeholder={`${budgetMax}`}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="mr-2 border border-gray-600 text-gray-600 font-normal rounded-lg  w-full sm:w-auto px-3 py-1.5 text-center hover:bg-gray-600 hover:text-white"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center "
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default EditBudgetModal;
