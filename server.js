const express = require("express");
const PDFDocument = require("pdfkit");

const app = express();

app.get("/make-pdf", (req, res) => {
  const doc = new PDFDocument();

  // 브라우저에서 다운로드되도록 헤더 설정
  res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
  res.setHeader("Content-Type", "application/pdf");

  // PDF 내용을 response로 바로 출력
  doc.pipe(res);

  // PDF에 글자/도형 추가
  doc.fontSize(20).text("Hello Node.js PDF!", 100, 100);
  doc.text("서버에서 만든 PDF입니다 😃", 100, 150);

  doc.end();
});

app.listen(3000, () => {
  console.log("✅ PDF 서버 실행: http://localhost:3000/make-pdf");
});
