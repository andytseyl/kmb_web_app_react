import ChooseLine from "./components/chooseLine";
import SearchBar from "./components/searchBar";
import ShowLine from "./components/showLine";
import useFetchRoutesData from "./components/useFetchRoutesData";
import { useState } from "react";
import moment from "moment";

function App() {
  const [searchedLine, setSearchedLine] = useState({});
  const [content, setContent] = useState("");
  const allInfo = useFetchRoutesData();
  if (Object.keys(allInfo).length === 0) return null;

  return (
    <section className="m-2 md:max-w-screen-md lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
      <img
        className="mb-4 rounded-md"
        src="https://www.681busterminal.com/kmb.gif"
      ></img>
      <div className="flex justify-between items-center">
        <SearchBar setContent={setContent} content={content} />
        <div className="text-right">
          最後更新時間: <br />
          {moment().format("Do MMMM YYYY, h:mm:ss a")}
        </div>
      </div>
      <p className="mt-4 mb-4">請選擇路線:</p>
      <ChooseLine
        allInfo={allInfo}
        content={content}
        setSearchedLine={setSearchedLine}
      />
      <ShowLine searchedLine={searchedLine} />
    </section>
  );
}

export default App;
