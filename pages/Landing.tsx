import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Image as ImageIcon, Wand2 } from 'lucide-react';
import { Button } from '../components/Button';

export const Landing: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs font-medium mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Gemini 2.5 Flash Powered
            </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Create Stunning AI Images <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
              in Seconds
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
            Privacy-first text-to-image generator and editor. 
            No permanent storage. Get 25 free credits on signup.
            Branded by <span className="text-white font-semibold">Awais❤️‍🩹</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/generate">
              <Button className="w-full sm:w-auto group">
                Start Generating
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/payment">
              <Button variant="secondary" className="w-full sm:w-auto">
                Get Credits
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-white">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Text to Image</h3>
            <p className="text-zinc-400 text-sm">
              Generate high-fidelity visuals from simple text prompts. Supports realistic, anime, and 3D styles.
            </p>
          </div>

           <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-white">
              <Wand2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Image Editing</h3>
            <p className="text-zinc-400 text-sm">
              Upload an image and use text to edit it. "Add sunglasses", "Make it vintage", or "Remove background".
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-white">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
            <p className="text-zinc-400 text-sm">
              We don't store your images permanently. Cache is cleared every 60 seconds for maximum privacy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};