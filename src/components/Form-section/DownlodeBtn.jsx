import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
function DownlodeBtn() {
  const editor = useSelector((state) => state.editor.editor);

  const downloadPDF = async () => {
    if (editor) {
      const content = editor.getHTML(); // get the editor data from store
      const classedContent=`<div contenteditable="true" role="textbox" translate="no" class="tiptap " tabindex="0">${content}</div>`  // added tiptap class for css 

      //styles for pdf document 
      const style = `
      <style>  
      
      body {
        margin: 0; /* Ensure no extra space from body */
        padding: 0;
        font-family: Arial, sans-serif; /* Use a standard font for compatibility */
        line-height: 1.5; /* Improve readability */
        color: #333;
      }
      
      .tiptap {
        margin: 0; /* Ensure consistent spacing */
      
        pre {
          background: #000;
          border-radius: 0.5rem;
          color: #fff;
          font-family: "JetBrainsMono", monospace;
          padding: 0.75rem 1rem;
          margin-top: 1rem;
      
          code {
            background: none;
            color: inherit;
            font-size: 0.8rem;
            padding: 0;
          }
        }
      
        hr {
          border: none;
          border-top: 2px solid #454444; /* Dark gray for subtle separation */
          margin: 1.5rem 0;
        }
      }
      
      ul {
        list-style-type: disc;
        margin: 0;
        padding-left: 20px;
      }
      
      ol {
        list-style-type: decimal;
        margin: 0;
        padding-left: 20px;
      }
      
      h1 {
        font-size: 2.5rem; /* Slightly smaller for better PDF scaling */
        font-weight: bold;
        line-height: 1.2; /* Increase spacing for clarity */
        color: #2c3e50;
        letter-spacing: -0.5px;
        text-transform: capitalize;
      }
      
      h2 {
        font-size: 1.75rem; /* Adjust for better hierarchy */
        font-weight: 600;
        line-height: 1.3;
        color: #34495e;
        text-transform: capitalize;
      }
      
      h3 {
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.4;
        color: #7f8c8d;
        text-transform: capitalize;
      }
      
      p {
        font-size: 1rem;
        margin: 0.5rem 0; /* Add spacing for paragraphs */
        color: #000;
        text-transform: none; /* Avoid capitalizing all text in paragraphs */
      }
      
      /* Additional improvements for consistent margins in PDFs */
      * {
        box-sizing: border-box;
      }
      
      @media print {
        body {
          font-size: 12px; /* Scale font size for print */
        }
      
        h1, h2, h3 {
          page-break-after: avoid; /* Prevent headers from breaking across pages */
        }
      
        p, ul, ol {
          page-break-inside: avoid; /* Ensure content integrity in lists/paragraphs */
        }
      }
      </style>
      `;
      

      const styledContent= style + classedContent // finally combining the css and html

      const options = {  
        filename: "my-document.pdf",
        margin: 0.5,  
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };  //output pdf configurations
      
      html2pdf().set(options).from(styledContent).save();  //downlode the pdf
    }
  };

  return (
    <div>
      <button
        onClick={downloadPDF}
        className="bg-black hover:bg-zinc-800 text-white font-semibold text-3xl py-2 px-4 rounded-md w-full"
      >
        Downlode PDF
      </button>
    </div>
  );
}

export default DownlodeBtn;
