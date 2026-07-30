'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Image from 'next/image';

interface HeroImageUploadProps {
  currentImageUrl?: string;
  onUploadSuccess?: (url: string) => void;
  editable?: boolean;
}

export function HeroImageUpload({
  currentImageUrl,
  onUploadSuccess,
  editable = true,
}: HeroImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return 'Invalid format: JPG, PNG, WebP only';
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return 'File too large: max 5MB';
    }

    return null;
  };

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const supabase = getSupabase();
    if (!supabase) {
      toast.error('Supabase not configured');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `profile/hero-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading to Supabase:', error);
      return null;
    }
  };

  const handleFileSelect = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadToSupabase(file);
      
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        setPreviewUrl(null);
        toast.success('Image uploaded');
        
        if (onUploadSuccess) {
          onUploadSuccess(uploadedUrl);
        }
      } else {
        toast.error('Upload failed');
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    if (editable && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const displayUrl = previewUrl || imageUrl;

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        className={`relative w-full min-h-[400px] border-2 rounded-none overflow-hidden transition-colors duration-0 ${
          isDragging 
            ? 'border-black bg-gray-50' 
            : 'border-gray-300 bg-white'
        } ${editable ? 'cursor-pointer' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Image Display */}
        {displayUrl ? (
          <div className="relative w-full h-full min-h-[400px]">
            <Image
              src={displayUrl}
              alt="Hero"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Hover Overlay */}
            {editable && !isUploading && (
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-90 flex flex-col items-center justify-center transition-opacity duration-0">
                <ImageIcon className="h-12 w-12 text-white mb-3" />
                <p className="text-xs font-mono uppercase tracking-widest text-white">
                  CLICK.TO.CHANGE
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 border-2 border-black flex items-center justify-center mb-6">
              <ImageIcon className="h-10 w-10 text-black" />
            </div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-black mb-2">
              NO.IMAGE.SELECTED
            </h3>
            {editable && (
              <>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-4">
                  // CLICK OR DROP IMAGE
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  <Upload className="h-3 w-3" />
                  <span>JPG, PNG, WEBP (MAX 5MB)</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Drag Overlay */}
        <AnimatePresence>
          {editable && !isUploading && isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-2 border-white flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-white">
                  DROP.HERE
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Overlay */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-2 border-white flex items-center justify-center mx-auto">
                  <div className="w-3 h-3 bg-white animate-pulse" />
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-white">
                  UPLOADING...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Button */}
      {editable && !isUploading && (
        <div className="space-y-4">
          <button
            onClick={handleClick}
            className="w-full h-12 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors duration-0 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest"
          >
            <Upload className="h-3.5 w-3.5" />
            {imageUrl ? 'CHANGE.IMAGE' : 'UPLOAD.IMAGE'}
          </button>
          
          <div className="border border-gray-200 p-4 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              // UPLOAD.INFO
            </div>
            <div className="text-xs font-mono text-gray-600 space-y-1">
              <div>FORMAT: JPG, PNG, WEBP</div>
              <div>MAX.SIZE: 5MB</div>
              <div>RECOMMENDED: 800x800px (SQUARE)</div>
              <div>METHOD: CLICK BUTTON OR DRAG & DROP</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
