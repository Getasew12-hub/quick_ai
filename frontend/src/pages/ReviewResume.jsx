import { Check, FileText, Sparkles } from "lucide-react";
import React from "react";
import axios from "../middleware/axios";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";

function ReviewResume() {
  const [loading, setLoding] = React.useState(false);
  const [contentGenereate, setContentGene] = React.useState("");
  const [isFileUploaded, setIsFileUploaded] = React.useState(false);
  const { getToken } = useAuth();

  const fileAccepter = React.useRef();

  const [file, setFile] = React.useState("");

  async function handleFilechange(e) {
    try {
      const file = e.target.files[0];

      setFile(file);
      setIsFileUploaded(true);
    } catch (error) {
      toast.error("Something is wrong");
      setIsFileUploaded(false);
    }
  }

  async function hadleSubmition(e) {
    e.preventDefault();
     if(!file) return toast.error("Please upload file");
    setLoding(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await axios.post("/ai/resume-review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      const text = response.data.data;
      setContentGene("");
      let index = 0;

      const interval = setInterval(() => {
        setContentGene((prev) => prev + text[index]);
        index++;

        if (index >= text.length) {
          clearInterval(interval);
        }
      }, 4);

      return () => clearInterval(interval);
    } catch (error) {
      console.log("erro ron hadle summition form", error);
      toast.error("somthing is wrong");
    } finally {
      setLoding(false);
    }
  }

  return (
    <div className="flex flex-wrap p-4 gap-4 h-full overflow-y-auto mb-10">
      {/* left */}
      <div className="bg-white shadow flex-none h-fit  p-4 rounded-md max-w-lg w-full">
        <h2 className="flex gap-4 font-bold mb-5 text-xl items-center">
          <Sparkles className="text-green-500" /> Resume Review
        </h2>

        <form onSubmit={hadleSubmition}>
          <p className="text-sm mb-2">Upload Resume</p>
          <input
            type="file"
            name=""
            accept="application/pdf"
            hidden
            ref={fileAccepter}
            onChange={handleFilechange}
          />
          <button
            type="button"
            className="border relative border-gray-400   rounded-md p-2 text-sm w-full outline-0  text-left"
            onClick={() => fileAccepter.current.click()}
          >
            choose File
            {isFileUploaded && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                <Check size={20} />
              </span>
            )}
          </button>
          <p className="text-[12px] text-gray-500 mt-1">
            Supports PDF resume only.
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`bg-linear-to-r from-emerald-400 to-emerald-600 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10 ${loading ? "cursor-not-allowed from-emerald-500/50 to-emerald-600/50" : "cursor-pointer"}`}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <FileText /> Review Resume
              </>
            )}
          </button>
        </form>
      </div>

      {/* right */}
      <div className="bg-white shadow  p-4 rounded-md max-w-lg w-full min-h-96  h-fit flex flex-col overflow-hidden pb-10  overflow-y-auto max-h-full">
        <h2 className="flex gap-4 font-bold mb-5 text-xl items-center">
          <FileText className="text-green-500" /> Analysis Results
        </h2>

        {contentGenereate && contentGenereate.length > 0 ? (
          <div className="rever-rw">
            <Markdown>{contentGenereate}</Markdown>
          </div>
        ) : (
          <div className="h-full  flex items-center justify-center ">
            <div className="flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center">
              <FileText />
              <p>Upload a resume and click "Review Resume" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewResume;
