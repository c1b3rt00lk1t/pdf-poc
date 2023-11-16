/**
 * The Transformations component will accept a set of pdf files and a general action that the user wants to do with them: combine, split, add page numbers.
 * In the first mvc it will only add page numbers to the pdf files
 * It will use the pdf-lib library
 * It will provide a button to download the modified pdf file
 */

interface TransformationsProps {
  action: "combine" | "split" | "pages";
  files: File[];
}

const Transformations = ({ files, action }: TransformationsProps) => {
  // when the button is clicked the files[0] will be donwloaded
  // this is achieved by a download <a> tag
  function handleClickDownload() {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function () {
      const base64data = reader.result;
      const downloadLink = document.createElement("a");
      const fileName = "combined.pdf";

      downloadLink.href = base64data as string;
      downloadLink.download = fileName;
      downloadLink.click();
    };
  }

  return (
    <div>
      <h1>{action === "pages" && "Add page numbers"}</h1>
      <p>{files[0] && files[0].name}</p>
      <button onClick={handleClickDownload}>Download</button>
    </div>
  );
};

export default Transformations;
