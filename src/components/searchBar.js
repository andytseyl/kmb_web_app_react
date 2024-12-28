import { useState } from "react";

function SearchBar({ content, setContent }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent(inputValue); // inputValue 存入 content
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border-2 border-gray-500 rounded-md mr-4 p-1 focus:outline-none focus:border-black focus:ring-black focus:ring-1"
        type="text"
        placeholder="請輸入路線號碼"
        value={inputValue}
        onChange={(e) => {
          setInputValue(
            e.target.value.replaceAll(/[^a-zA-Z0-9]/g, "").toUpperCase()
          );
        }}
      />
      <button
        className="mt-1 border-2 rounded-md p-1 hover:bg-gray-300 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
        type="submit"
      >
        搜尋路線
      </button>
    </form>
  );
}

export default SearchBar;
