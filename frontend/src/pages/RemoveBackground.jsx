import { Check, Download, Eraser, Sparkles } from "lucide-react";
import React from "react";
import axios from "../middleware/axios";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

function RemoveBackground() {
  const [loading, setLoding] = React.useState(false);
  const [contentGenereate, setContentGene] = React.useState("");
  const [isFileUploaded, setIsFileUploaded] = React.useState(false);
  const imageAccepter = React.useRef();
  const { getToken } = useAuth();

  const [image, setImage] = React.useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file.size > 10000000) {
      toast.error(
        "File size is too large, please upload a file less than 10mb.",
      );
      return;
    }
    if (file) {
      // Process the selected image fileconsole.log("Selected file:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsFileUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleForm(e) {
    e.preventDefault();
    setLoding(true);

    try {
      const resopnese = await axios.post(
        "/ai/image-background-remove",
        { image },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      const resopneseimage = resopnese.data.data;

      setContentGene(resopneseimage);
    } catch (error) {
      toast.error("Something is wrong");
      console.log(error);
    } finally {
      setLoding(false);
    }
  }

  async function downloadImage() {
    if (!contentGenereate) return;

    const link = contentGenereate.replace("/upload/", "/upload/fl_attachment/");

    const linkEle = document.createElement("a");
    linkEle.href = link;
    linkEle.download = "quickai_bg_removed.png";
    document.body.appendChild(linkEle);
    linkEle.click();
    document.body.removeChild(linkEle);
  }

  return (
    <div className="flex flex-wrap p-4 gap-4 h-full overflow-y-auto mb-10">
      {/* left */}
      <div className="bg-white shadow flex-none h-fit  p-4 rounded-md max-w-lg w-full">
        <h2 className="flex gap-4 font-bold mb-5 text-xl items-center">
          <Sparkles className="text-orange-500" /> Background Removal
        </h2>

        <form onSubmit={handleForm}>
          <p className="text-sm mb-2">Upload image</p>
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            ref={imageAccepter}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="border border-gray-400   rounded-md p-2 text-sm w-full outline-0 mb-4 text-left relative"
            onClick={() => imageAccepter.current.click()}
          >
            choose File
            {isFileUploaded && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                <Check size={20} />
              </span>
            )}
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`bg-linear-to-r from-orange-400 to-orange-600 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10 ${loading ? "cursor-not-allowed from-orange-500/50 to-orange-600/50" : "cursor-pointer"}`}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <Eraser /> Remove background
              </>
            )}{" "}
          </button>
        </form>
      </div>

      {/* right */}
      <div className="bg-white shadow  p-4 rounded-md max-w-lg w-full max-h-96  h-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="flex gap-4 font-bold mb-5 text-xl items-center">
            <Eraser className="text-orange-500" /> Processed Image
          </h2>
          {contentGenereate && (
            <div>
              <button
                button
                onClick={downloadImage}
                className="flex justify-center items-center gap-2 p-2 rounded-m  font-semibold text-white bg-linear-to-r from-orange-400 to-orange-600 text-sm rounded-full"
              >
                <Download size={17} /> Download image
              </button>
            </div>
          )}
        </div>

        {contentGenereate ? (
          <img
            src={contentGenereate}
            className="w-full h-full object-contain"
            onLoad={() => console.log("loading", true)}
          />
        ) : (
          <div className="h-full  flex items-center justify-center ">
            <div className="flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center">
              <Eraser />
              <p>
                Upload an image and click "Remove Background" to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RemoveBackground;
