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
  }

.tiptap {
  :first-child {
    margin-top: 0;
  }

  pre {
    background: black;
    border-radius: 0.5rem;
    color: white;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    margin-top:1.0rem ;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  hr {
    border: none;
    border-top: 2px solid rgb(69, 68, 68);
    cursor: pointer;
    margin: 1.5rem 0;
  
    &.ProseMirror-selectednode {
      border-top: 1px solid black;
    }
  }

}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

ol {
  list-style-type: decimal;
  padding-left: 20px;
}
  
h1 {
  font-size: 3rem;  
  font-weight: bold;
  line-height: 1.0;
  color: #2c3e50;  
  letter-spacing: -0.5px;  
  text-transform: capitalize;  
}

h2 {
  font-size: 1.5rem;  
  font-weight: 600;  
  line-height: 1.0;
  color: #34495e;  
  text-transform: capitalize;
}

h3 {
  font-size: 1.5rem; 
  font-weight: 500;  
  line-height: 1.0;
  color: #7f8c8d; 
  text-transform: capitalize;
}

p{
  font-size: 1.0rem;
  color:black;
  text-transform: capitalize;
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
