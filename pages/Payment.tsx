import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CheckCircle2 } from 'lucide-react';

export const Payment: React.FC = () => {
  const [plan, setPlan] = useState('50');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-20 px-6 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Payment Request Sent</h2>
        <p className="text-zinc-400 mb-8">
          Admin will review your transaction ID and approve credits shortly. Thank you for choosing YBT AI.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">Submit Another</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">Buy Credits</h1>
      <p className="text-center text-zinc-400 mb-12">Simple manual payments via Easypaisa.</p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Step 1: Plan Selection */}
        <div className="space-y-6">
           <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">1. Select Plan</h3>
              <div className="space-y-3">
                {['50', '100', '200'].map((credits) => (
                  <div 
                    key={credits}
                    onClick={() => setPlan(credits)}
                    className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${plan === credits ? 'border-white bg-zinc-800' : 'border-zinc-800 hover:border-zinc-600'}`}
                  >
                    <span className="text-white font-medium">{credits} Credits</span>
                    <span className="text-zinc-400 text-sm">PKR {parseInt(credits) * 2}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">2. Send Payment</h3>
              <div className="bg-white p-4 rounded-lg mb-4">
                 <div className="aspect-square w-32 mx-auto bg-black mb-2 flex items-center justify-center text-white text-xs">
                    [QR CODE PLACEHOLDER]
                 </div>
                 <p className="text-center text-black font-mono text-sm font-bold">Easypaisa</p>
              </div>
              <div className="text-sm text-zinc-300 space-y-2">
                  <p>Account Title: <span className="text-white font-medium">Awais Payment</span></p>
                  <p>Account Number: <span className="text-white font-medium">0300-1234567</span></p>
              </div>
           </div>
        </div>

        {/* Step 3: Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">3. Submit Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-2">Plan Selected</label>
                    <input type="text" value={`${plan} Credits`} disabled className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-400 cursor-not-allowed" />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-2">Your Name</label>
                    <input type="text" required placeholder="Enter your name" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:border-white outline-none transition-colors" />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-2">Transaction ID (TRX)</label>
                    <input type="text" required placeholder="e.g. 1234567890" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:border-white outline-none transition-colors font-mono" />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-2">Date</label>
                    <input type="date" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:border-white outline-none transition-colors" />
                </div>

                <Button type="submit" className="w-full mt-4">Verify Payment</Button>
            </form>
        </div>
      </div>
    </div>
  );
};