// Using jsPDF CDN: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js

const PDFMock = {
    generateOrderPDF: (data) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text("DON DANG KY DICH VU NACENCOMM", 20, 30);
        
        doc.setFontSize(14);
        doc.text(`Ma ho so: ${data.orderId || 'N/A'}`, 20, 50);
        doc.text(`Ngay dang ky: ${new Date().toLocaleDateString()}`, 20, 60);
        
        doc.text("THONG TIN KHACH HANG", 20, 80);
        doc.line(20, 82, 190, 82);
        
        doc.text(`Ten: ${data.customer_name || 'N/A'}`, 20, 95);
        doc.text(`MST/CCCD: ${data.tax_id || 'N/A'}`, 20, 105);
        doc.text(`San pham: ${data.productName || 'N/A'}`, 20, 115);
        doc.text(`Goi cuoc: ${data.package || 'N/A'}`, 20, 125);
        
        doc.text("Vui long mang ho so nay den van phong Nacencomm hoac doi nhan vien", 20, 150);
        doc.text("kinh doanh lien he de hoan tat thu tuc.", 20, 160);
        
        doc.save(`Nacencomm_Order_${data.orderId || 'Demo'}.pdf`);
    }
};
