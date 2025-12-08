import React from "react";
import PlaygroundHeader from "@/components/nestedComponents/PlaygroundHeader";
import CodeEditor from "@/components/nestedComponents/CodeEditor";

const PlayGround: React.FC = () => {

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black to-gray-700 text-[#fff] px-[24px] py-[40px]">

      {/* Header */}
      <PlaygroundHeader />

      {/* Monaco Code Editor */}
      <CodeEditor />
      
    </div>
  );
};

export default PlayGround;
