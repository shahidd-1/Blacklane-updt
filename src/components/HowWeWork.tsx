// src/components/HowWeWork.tsx

import React from 'react';

export default function HowWeWork() {
  return (
    <div id="how-we-work" className="relative w-full text-white bg-black py-24 md:py-48 px-8 md:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">Your Tools, Our Intelligence.</h1>
        <p className="text-lg mb-12 max-w-2xl">
          We don't force you to change your workflow. We connect to your existing systems—from spreadsheets to accounting software—to give you a single, unified layer of intelligence.
          <br /><br />
          Here's how we transform your data into a powerful asset.
        </p>

        <div className="space-y-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Connect</h2>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-8">
              <p className="text-lg max-w-lg md:w-1/2">
                We seamlessly integrate with the tools you already use. Keep your trusted Excel sheets, Tally ledger, and even your email and WhatsApp logs. Our platform acts as a bridge, not a replacement.
              </p>

              <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 md:w-1/2 md:ml-auto">
                <img src="/logos/excel.png" alt="Excel logo" className="h-12" />
                <img src="/logos/tally.png" alt="Tally logo" className="h-12" />
                <img src="/logos/email.png" alt="Email logo" className="h-10" />
                <img src="/logos/whatsapp.png" alt="WhatsApp logo" className="h-12" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-2">Unify</h2>
              <p className="text-lg">
                Your siloed data is automatically pulled into our secure hub. We combine financial records, on-site progress reports, and project logs into one central, reliable source of truth.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/images/unify.png" alt="Data unification diagram" className="w-full max-h-80 object-contain" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-2">Transform</h2>
              <p className="text-lg">
                Our AI engine turns that raw data into clear, actionable insights. Get a real-time view of cash flow, forecast project risks, and ask natural language questions to understand your business better than ever before.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/images/transform.png" alt="Data transformation diagram" className="w-full max-h-80 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}