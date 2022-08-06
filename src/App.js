import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <div className="min-h-screen w-full p-4 bg-no-repeat bg-center bg-cover bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400  flex-column justify-center items-center content-center">
      <div className="flex-column justify-center items-center sm:flex w-full mb-10 ">
        {/* <div className=" w-1/2 bg-green-400 justify-center sm:justify-start my-4 sm:my-0"> */}
          <h1 className="w-full sm:w-1/2 text-center text-4xl text-gray-800 font-bold my-4">Budgets</h1>
        {/* </div> */}
        <div className=" w-full sm:w-1/2 flex justify-center sm:justify-start">
          <button className="w-auto flex justify-center items-center px-4 h-10 bg-green-700 text-white font-normal rounded">
            Add Budget
          </button>
          <button className="w-auto flex justify-center items-center px-4 h-10 ml-2 border border-gray-600 text-gray-600 font-normal rounded">
            Add Expense
          </button>
        </div>
      </div>
      <div className="w-full sm:grid sm:grid-cols-cards gap-4 items-start justify-center px-4 ">
        <BudgetCard name="Food" amount={720} max={1200}/>

      </div>
    </div>
  );
}

export default App;
