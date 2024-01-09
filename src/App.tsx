import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [size, setSize] = useState<string>("100x100");

  const handleQRgeneration = (event: React.FormEvent) => {
    event.preventDefault(); // prevent the form from refreshing the page
    const encodedData = encodeURIComponent(userInput);
    const colorRGB = hexToRGB(color);
    const bgColorRGB = hexToRGB(bgColor);

    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=${size}&color=${colorRGB}&bgcolor=${bgColorRGB}`;
    console.log(apiUrl);

    fetch(apiUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setUrl(url);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleQRdownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "QRCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hexToRGB = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}-${g}-${b}`;
  };

  return (
    <>
      <div className="app">
        <h1>QR Code Generator</h1>
        <form onSubmit={handleQRgeneration}>
          <input
            className="text-input"
            type="text"
            placeholder="Enter text or URL"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div className="options">
            <select
              className="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="100x100">100 x 100</option>
              <option value="200x200">200 x 200</option>
              <option value="300x300">300 x 300</option>
            </select>
            <input
              className="color-input"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              className="color-input"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>

          {url && (
            <div className="qr-box">
              <img src={url} alt="QR Code" />
            </div>
          )}

          <div className="button-group">
            <button type="submit">Generate</button>
            <button type="button" onClick={handleQRdownload}>
              Download
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
