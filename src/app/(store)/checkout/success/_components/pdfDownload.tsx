"use client";

export default function PdfDownload() {
  function handlePrint() {
    window.print();
  }

  return (
    <div>
      <button onClick={handlePrint}>Download PDF</button>
    </div>
  );
}
