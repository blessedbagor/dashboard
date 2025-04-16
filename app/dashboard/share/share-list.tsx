'use client';

import { useEffect, useState, useRef } from "react";
import { Affiliate } from "@/types";
import ShareForm from "./share-form";
import { getShareServiceById } from "@/lib/actions/affiliate.actions";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Copy, Download } from "lucide-react";
import { formatError } from "@/lib/utils";
import { QRCodeCanvas } from "qrcode.react";

const ShareList = ({ userId }: { userId?: string }) => {
  const [affiliate, setAffiliate] = useState<Affiliate[]>([]);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAffiliate = async () => {
      try {
        const res = await getShareServiceById();
        if (res) setAffiliate([res]);
      } catch (error) {
        console.error("Failed to load share service:", error);
      }
    };

    if (userId) loadAffiliate();
  }, [userId]);

  const reload = async () => {
    try {
      const res = await getShareServiceById();
      if (res) {
        setAffiliate([res]);
      }
    } catch (error) {
      return { success: false, message: formatError(error) };
    }
  };

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const downloadQRCode = () => {
  if (qrRef.current) {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const margin = 20; // Adjust margin size as needed

      // Create a new canvas with margin
      const newCanvas = document.createElement("canvas");
      const ctx = newCanvas.getContext("2d");

      if (ctx) {
        const newSize = canvas.width + margin * 2; // New size including margin
        newCanvas.width = newSize;
        newCanvas.height = newSize;

        // Fill the background with white (optional)
        ctx.fillStyle = "#ffffff"; // White background
        ctx.fillRect(0, 0, newSize, newSize);

        // Draw the original QR code with margin
        ctx.drawImage(canvas, margin, margin);

        // Convert to image and download
        const url = newCanvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "share-link-qrcode.png";
        a.click();
      }
    }
  }
};


  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          {affiliate.length > 0 ? (
            <>
          {affiliate.map((affiliate) => (
            <div key={affiliate.id} className="space-y-6">
              <h2 className="text-2xl font-bold">Share Service Details</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Referral Code:</span>
                  <span className="text-gray-700 dark:text-white">{affiliate.referralCode || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium mr-4">Affiliate Link:</span>
                  <span className="text-gray-700 dark:text-white break-all whitespace-normal">
                    {affiliate.affiliateLink || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center font-bold text-md: md:text-lg">
                  <span>Share this link:</span>
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/${affiliate.referralCode}`}
                      target="_blank"
                      className="text-gray-500 dark:text-white underline hover:text-yellow-500 break-all"
                    >
                      {`https://igift.ph/${affiliate.referralCode}`}
                    </Link>
                    <button
                      onClick={() => handleCopyClick(`https://igift.ph/${affiliate.referralCode}`)}
                      className="text-gray-600 dark:text-white hover:text-yellow-500"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="relative flex items-center space-x-6">
                  {/* QR Code Container */}
                  <div ref={qrRef} className="relative p-4 border rounded-2xl shadow-md bg-white">
                    <QRCodeCanvas value={`https://igift.ph/${affiliate.referralCode}`} size={128} />
                    
                    {/* Centered Download Button */}
                    <button
                      onClick={downloadQRCode}
                      className="absolute inset-0 m-auto h-8 w-8 flex items-center justify-center text-yellow-500 bg-white hover:text-white hover:bg-yellow-500 rounded"
                    >
                      <Download size={24} />
                    </button>
                  </div>
                </div>

                {affiliate.affiliateLink ? (
                  <div>
                    <ShareForm userId={userId ?? ''} onAffiliateLinkSubmitted={reload} />
                  </div>
                ) : (
                  <div className="text-red-500">No valid affiliate link to share</div>
                )}
              </div>
            </div>
          ))}
          </>
          ) : (
            
            <div className="flex flex-col items-center text-gray-500 pb-4">
            <p className="text-center">No share service setup yet.</p>
            <div className="mt-4">
              <ShareForm userId={userId ?? ''} onAffiliateLinkSubmitted={reload} />
            </div>
          </div>

          )}
        </CardContent>
      </Card>
    </div>

  );
};

export default ShareList;
