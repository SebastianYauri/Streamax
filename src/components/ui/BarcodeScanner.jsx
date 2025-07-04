"use client";
import React, { useState, useRef, useEffect } from "react";
import Quagga from "@ericblade/quagga2";

export default function BarcodeScanner({ onDetected }) {
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const scannerRef = useRef(null);

  // Limpieza de cámara al desmontar
  useEffect(() => {
    return () => {
      Quagga.CameraAccess.release();
    };
  }, []);

  // Start/stop scanner
  useEffect(() => {
    if (!scanning || !scannerRef.current) return;
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          setCameraError(err);
          return;
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(handleDetected);
    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
    function handleDetected(result) {
      if (onDetected && result?.codeResult?.code) {
        onDetected(result.codeResult.code);
        setScanning(false);
        Quagga.stop();
      }
    }
  }, [scanning, onDetected]);


  return (
    <div>
      {cameraError && (
        <p className="text-red-600">Error inicializando cámara: {String(cameraError)}</p>
      )}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded mb-2"
        onClick={() => setScanning((s) => !s)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25v-1.5A1.5 1.5 0 0 1 5.25 2.25h1.5m10.5 0h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5m0 13.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5m-10.5 0h-1.5a1.5 1.5 0 0 1-1.5-1.5v-1.5m0-10.5h16.5m-16.5 0v10.5m16.5-10.5v10.5m-16.5 0h16.5" />
        </svg>
        {scanning ? "Cerrar escáner" : "Escanear código"}
      </button>
      {scanning && (
        <div style={{ width: "100%", maxWidth: 320, margin: "0 auto" }}>
          <div
            ref={el => {
              if (el) el.setAttribute('data-barcode-scanner', '');
              scannerRef.current = el;
            }}
            style={{
              width: "100%",
              aspectRatio: "4/3",
              background: "#000",
              border: "2px solid #333",
              position: "relative",
              overflow: "hidden"
            }}
          />
          <style>{`
            [data-barcode-scanner] video,
            [data-barcode-scanner] canvas {
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
              display: block;
              position: absolute;
              top: 0; left: 0;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
