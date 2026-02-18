import { Sparkles, SquarePen } from "lucide-react";
import React from "react";
import axios from "../middleware/axios";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";
function WriteArticle() {
  const { getToken } = useAuth();
  const artilceLength = [
    {
      length: "500-800",
      label: "Short (500-800 word)",
    },
    {
      length: "800-1200",
      label: "Medium (800-1200 word)",
    },
    {
      length: "1200",
      label: "Long (1200+ word)",
    },
  ];
  const [loading, setLoding] = React.useState(false);
  const [contentGenereate, setContentGene] = React.useState("");
  const [article, setArticle] = React.useState("");
  const [length, setLength] = React.useState("500-800");

  async function handleForm(e) {
    e.preventDefault();
    setLoding(true);

    try {
      const resopnese = await axios.post(
        "/ai/generate-article",
        {
          prompt: article,
          length
        },
        {
          headers: {
            Authorization: `Beares ${await getToken()}`,
          },
        },
      );

      toast.success("you get the righ postion");
    const text = resopnese.data.data;
      setContentGene(text);
      // let index = 0;

      // const interval = setInterval(() => {
      //   setContentGene((prev) => prev + text[index]);
      //   index++;

      //   if (index >= text.length) {
      //     clearInterval(interval);
      //   }
      // }, 3);

      // return () => clearInterval(interval);
    } catch (error) {
      toast.error("Something is wrong");
    } finally {
      setLoding(false);
    }
  }
  return (
    <div className="flex flex-wrap p-4 gap-4 h-full overflow-y-auto mb-10">
      {/* left */}
      <div className="bg-white shadow flex-none h-fit  p-4 rounded-md max-w-lg w-full">
        <h2 className="flex gap-4 font-bold mb-5 text-xl items-center">
          <Sparkles className="text-blue-500" /> Article Configuration
        </h2>

        <form onSubmit={handleForm}>
          <p className="text-sm mb-2">Article Topic</p>
          <input
            className="border border-gray-400 rounded-md p-2 text-sm w-full outline-0 mb-4"
            type="text"
            name="article"
            id="article"
            placeholder="The future or artificial intelligence is ..."
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            required
          />

          <p className="text-sm mb-2">Article Length</p>
          <p>good moring</p>
          <div className="flex flex-wrap gap-3 max-w-80">
            {artilceLength.map((item) => (
              <span
                onClick={() => setLength(item?.length)}
                key={item?.length}
                className={`text-[12px] cursor-pointer border border-gray-400 w-fit py-0.5 px-2 rounded-full ${length == item?.length && "bg-blue-400/10 border-blue-500! text-blue-500!"}`}
              >
                {item.label}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`bg-linear-to-r cursor-pointer from-blue-500 to-blue-300 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10 ${loading && "from-blue-500/50! to-blue-300/50! cursor-not-allowed!"}`}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <SquarePen /> Generate aticle
              </>
            )}
          </button>
        </form>
      </div>

      {/* right */}
      {/* <div className="bg-white shadow  p-4 rounded-md max-w-lg w-full min-h-96  h-fit flex flex-col overflow-hidden pb-10  overflow-y-auto max-h-full">
        <h2 className="flex gap-4 font-bold mb-5 text-xl items-center">
          <SquarePen className="text-blue-500" /> Article Configuration
        </h2>

        {contentGenereate && contentGenereate?.length > 0 ? (
          <div className="rever-rw">
            <Markdown>{contentGenereate}</Markdown>
          </div>
        ) : (
          <div className="h-full  flex items-center justify-center ">
            <div className="flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center">
              <SquarePen />
              <p>Enter a topic and click “Generate article ” to get started</p>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default WriteArticle;
