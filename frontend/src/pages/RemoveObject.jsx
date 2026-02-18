import { Check, DessertIcon, Download, Scissors, Sparkles } from "lucide-react";
import React from "react";
import axios from "../middleware/axios";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

function RemoveObject() {
  const imageAccepter = React.useRef();
  const [loading, setLoding] = React.useState(false);
  const [contentGenereate, setContentGene] = React.useState("");
  const [isFileUploaded, setIsFileUploaded] = React.useState(false);
  const { getToken } = useAuth();

  const [image, setImage] = React.useState("");
  const [Description, setDescription] = React.useState("");

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

  async function hadleFormSend(e) {
    e.preventDefault();
     if(!image) return toast.error("Please upload image");
    setLoding(true);
    try {
  const response = await axios.post("/ai/image-object-remove", {image, object:Description}, {
        headers: {
         
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      const resopneseimage = response?.data?.data;
      setContentGene(resopneseimage);
    } catch (error) {
      toast.error("Something is wrong");
      console.log(error);
    } finally {
      setLoding(false);
    }
  }

  function DonwnloadImge() {
    if (!contentGenereate) return;

    const link = contentGenereate.replace("/upload/", "/upload/fl_attachment/");

    const linkEle = document.createElement("a");
    linkEle.href = link;
    linkEle.download = "quickai_object_removed.png";
    document.body.appendChild(linkEle);
    linkEle.click();
    document.body.removeChild(linkEle);
  }

  return (
    <div className="flex flex-wrap p-4 gap-4 h-full overflow-y-auto mb-10">
      {/* left */}
      <div className="bg-white shadow flex-none h-fit  p-4 rounded-md max-w-lg w-full">
        <h2 className="flex gap-4 font-bold mb-5 text-xl items-center">
          <Sparkles className="text-blue-500" /> Object Removal
        </h2>

        <form onSubmit={hadleFormSend}>
          <p className="text-sm mb-2">Upload image</p>
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            ref={imageAccepter}
            onChange={handleImageChange}
            required
          />
          <button
            type="button"
            className="border relative border-gray-400   rounded-md p-2 text-sm w-full outline-0 mb-4 text-left"
            onClick={() => imageAccepter.current.click()}
          >
            choose File
            {isFileUploaded && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                <Check size={20} />
              </span>
            )}
          </button>

          <p className="text-sm mb-2">Describe object name to remove</p>
          <textarea
            rows={4}
            className="border border-gray-400 max-h-96 min-h-20 rounded-md p-2 text-sm w-full outline-0 "
            placeholder="e.g., watch or spoon , Only single object name"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-linear-to-r from-blue-400 to-purple-600 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10 ${loading ? "cursor-not-allowed from-blue-500/50 to-purple-600/50" : "cursor-pointer"}`}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <Scissors /> Remove background
              </>
            )}
          </button>
        </form>
      </div>

      {/* right */}
      <div className="bg-white shadow  p-4 rounded-md max-w-lg w-full max-h-96  h-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="flex gap-4 font-bold mb-5 text-xl items-center max-sm:text-sm">
            <Scissors className="text-blue-500" /> Processed Image
          </h2>
          {contentGenereate && (
            <div>
              <button
                button
                onClick={DonwnloadImge}
                className="flex justify-center items-center gap-2 p-2 rounded-m  font-semibold text-white bg-linear-to-r from-orange-400 to-orange-600 text-sm rounded-full max-sm:text-[12px] max-sm:p-1 max-sm:font-light max-sm:gap-1 "
              >
                <Download size={17} /> Download 
              </button>
            </div>
          )}
        </div>
        {contentGenereate ? (
          <img
            src={contentGenereate}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="h-full  flex items-center justify-center ">
            <div className="flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center">
              <Scissors />
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

export default RemoveObject;
