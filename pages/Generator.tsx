import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Image as ImageIcon, Wand2, Upload, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { AppMode, GeneratedImage } from '../types';
import { generateImageFromText, editImageWithPrompt, fileToBase64 } from '../services/geminiService';

interface GeneratorProps {
  credits: number;
  deductCredit: (amount: number) => void;
}

export const Generator: React.FC<GeneratorProps> = ({ credits, deductCredit }) => {
  const [mode, setMode] = useState<AppMode>(AppMode.GENERATE);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Edit Mode States
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const COST_PER_IMAGE = 5;

  const handleModeSwitch = (newMode: AppMode) => {
    setMode(newMode);
    setPrompt('');
    setError(null);
    setResult(null);
    setUploadedImage(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large. Max 5MB.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setUploadedImage(base64);
      setError(null);
    } catch (err) {
      setError("Failed to read file.");
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (credits < COST_PER_IMAGE) {
      setError("Insufficient credits. Please purchase more.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      let imageUrl: string;
      
      if (mode === AppMode.GENERATE) {
        imageUrl = await generateImageFromText(prompt);
      } else {
        if (!uploadedImage) {
          throw new Error("Please upload an image to edit first.");
        }
        imageUrl = await editImageWithPrompt(uploadedImage, prompt);
      }

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        createdAt: new Date(),
        type: mode === AppMode.GENERATE ? 'creation' : 'edit'
      };

      setResult(newImage);
      deductCredit(COST_PER_IMAGE);
    } catch (err: any) {
      setError(err.message || "Something went wrong with Gemini.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      
      {/* Header / Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            AI Studio <span className="text-zinc-500 text-sm font-normal">by Awais❤️‍🩹</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            {mode === AppMode.GENERATE ? 'Transform text into visuals.' : 'Edit existing images with text.'}
          </p>
        </div>

        <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800 inline-flex">
          <button
            onClick={() => handleModeSwitch(AppMode.GENERATE)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === AppMode.GENERATE ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
          >
            <ImageIcon className="w-4 h-4" /> Generate
          </button>
          <button
            onClick={() => handleModeSwitch(AppMode.EDIT)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === AppMode.EDIT ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
          >
            <Wand2 className="w-4 h-4" /> Edit Image
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upload Area (Edit Mode Only) */}
          {mode === AppMode.EDIT && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">Source Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden aspect-video ${uploadedImage ? 'border-zinc-700' : 'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50'}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Source" className="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-30 transition-opacity" />
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                    <span className="text-zinc-400 text-xs">Click to upload image</span>
                  </div>
                )}
                {uploadedImage && (
                  <div className="relative z-10 bg-black/50 px-3 py-1 rounded-full text-xs text-white backdrop-blur-sm">
                    Change Image
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              {mode === AppMode.GENERATE ? 'Prompt' : 'Edit Instruction'}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={mode === AppMode.GENERATE 
                ? "A futuristic cyberpunk city, neon lights, rain..." 
                : "Add a pair of sunglasses to the person..."}
              className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 resize-none text-sm"
            />
            <div className="flex justify-between items-center">
               <span className="text-xs text-zinc-500">Cost: {COST_PER_IMAGE} credits</span>
               <span className="text-xs text-zinc-500">{prompt.length}/500</span>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={handleGenerate} 
            isLoading={isGenerating} 
            className="w-full"
            disabled={!prompt || (mode === AppMode.EDIT && !uploadedImage)}
          >
             {mode === AppMode.GENERATE ? 'Generate Image' : 'Apply Edit'}
          </Button>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Right Panel: Output */}
        <div className="lg:col-span-8">
          <div className="h-full min-h-[400px] rounded-2xl bg-zinc-900/30 border border-zinc-800 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
            
            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 z-20 backdrop-blur-sm">
                <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-400 animate-pulse text-sm">Gemini is thinking...</p>
              </div>
            )}

            {result ? (
              <div className="relative w-full h-full flex flex-col">
                 <div className="flex-1 p-4 flex items-center justify-center">
                   <img 
                    src={result.url} 
                    alt={result.prompt} 
                    className="max-w-full max-h-[600px] rounded-lg shadow-2xl shadow-black"
                   />
                 </div>
                 <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                    <p className="text-xs text-zinc-400 truncate max-w-md font-mono">
                        {result.prompt}
                    </p>
                    <a 
                      href={result.url} 
                      download={`ybt-ai-${result.id}.png`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                 </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mx-auto mb-4 rotate-12">
                  {mode === AppMode.GENERATE ? <ImageIcon className="w-8 h-8 text-zinc-600" /> : <Wand2 className="w-8 h-8 text-zinc-600" />}
                </div>
                <h3 className="text-zinc-300 font-medium mb-2">Ready to Create</h3>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                  {mode === AppMode.GENERATE 
                    ? "Enter a prompt to generate stunning visuals using Gemini Flash." 
                    : "Upload an image and tell AI how to edit it."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};