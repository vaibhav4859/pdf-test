// PDFDownloadCleanInvoice.jsx
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

// Invoice Layout Component
const PDFLayout = React.forwardRef(({ title, customerName, date, items, total }, ref) => (
  <div
    ref={ref}
    style={{
      width: "210mm",
      minHeight: "297mm",
      padding: "20mm",
      fontFamily: "'Segoe UI', sans-serif",
      fontSize: "12px",
      boxSizing: "border-box",
      color: "#333",
    }}
  >
    {/* Header */}
    <header style={{ borderBottom: "2px solid #333", marginBottom: "15px", paddingBottom: "8px" }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <small>Date: {date}</small>
    </header>

    {/* Customer Info */}
    <section style={{ marginBottom: "20px" }}>
      <strong>Customer:</strong> {customerName}
    </section>

    {/* Table */}
    <section>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Item</th>
            <th style={thStyle}>Qty</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.qty}</td>
              <td style={tdStyle}>₹{item.price}</td>
              <td style={tdStyle}>₹{item.qty * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

    {/* Footer */}
    <footer style={{ marginTop: "20px", textAlign: "right", fontWeight: "bold" }}>
      Grand Total: ₹{total}
    </footer>
  </div>
));

// Table Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  backgroundColor: "#f4f4f4",
  textAlign: "left",
  padding: "6px 10px",
  border: "1px solid #ccc",
};

const tdStyle = {
  padding: "6px 10px",
  border: "1px solid #ddd",
};

// Main Component
const PDFDownloadCleanInvoice = () => {
  const pdfRef = useRef();

  const mockData = {
    title: "Invoice - ChannelKart",
    customerName: "Vaibhav Sachdeva",
    date: new Date().toLocaleDateString(),
    items: [
      { name: "Product A", qty: 2, price: 150 },
      { name: "Product B", qty: 1, price: 300 },
      { name: "Product C", qty: 5, price: 60 },
    ],
  };

  const total = mockData.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleDownload = () => {
    const element = pdfRef.current;

    html2pdf()
      .set({
        margin: 0,
        filename: "invoice-clean.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <>
      {/* Hidden PDF content */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <PDFLayout {...mockData} total={total} ref={pdfRef} />
      </div>

      {/* Button to trigger download */}
      <button onClick={handleDownload}>Download Invoice PDF</button>
    </>
  );
};

export default PDFDownloadCleanInvoice;
