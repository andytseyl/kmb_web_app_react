import { useState, useEffect } from "react";

function ChooseLine({ allInfo, content, setSearchedLine }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (allInfo && allInfo.data) {
      const foundRoutes = allInfo.data.filter((el) => el.route === content);
      if (foundRoutes.length > 0) {
        setLines(foundRoutes);
        // console.log(foundRoutes);
      } else {
        setLines([]);
      }
    }
  }, [allInfo, content]);

  return (
    <>
      {lines.length > 0 ? (
        lines.map((line, index) => (
          <button
            className="border-2 border-gray rounded-md mr-4 mb-4 p-1 hover:bg-gray-300 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
            key={index}
            onClick={() => setSearchedLine(line)}
          >
            由 {line.orig_tc} 到 {line.dest_tc}
          </button>
        ))
      ) : (
        <div>未找到匹配的路線</div>
      )}
    </>
  );
}

export default ChooseLine;
