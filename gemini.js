const pdfjsLib = window['pdfjs-dist/build/pdf']; // <-- ADD THIS LINE FIRST

document.getElementById('uploadForm').onsubmit = async function (e) {
  e.preventDefault();

  const file = document.getElementById('fileInput').files[0];
  let text = '';

  if (file && file.type === 'application/pdf') {
    const reader = new FileReader();

    reader.onload = async function () {
      const pdfData = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + ' ';
      }

      callGemini(text);
    };

    reader.readAsArrayBuffer(file);
  } else {
    alert('Please upload a valid PDF file.');
  }
};

// Gemini 1.5 Flash API call
async function callGemini(promptText) {
  const apiKey = "AIzaSyBlF6vPE1N4u-_ODGf4WfzOmFY6RDY9kdA"; // Replace this with your actual API key
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBlF6vPE1N4u-_ODGf4WfzOmFY6RDY9kdA" + apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: promptText }],
        role: "user"
      }]
    })
  });

  const data = await response.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

  document.getElementById('output').innerText = result;
}