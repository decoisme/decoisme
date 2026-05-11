'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return 'Format file harus JPG, PNG, atau WebP';
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return 'Ukuran file maksimal 5MB';
    }

    return null;
  };

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const supabase = getSupabase();
    if (!supabase) {
      toast.error('Supabase belum dikonfigurasi');
      return null;
    }

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `profile/hero-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload file to Supabase Storage (bucket: images)
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

      // Get public URL
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
    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadToSupabase(file);
      
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        setPreviewUrl(null);
        toast.success('Hero image berhasil diupload!');
        
        // Callback to parent component
        if (onUploadSuccess) {
          onUploadSuccess(uploadedUrl);
        }
      } else {
        toast.error('Gagal upload gambar');
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Terjadi kesalahan saat upload');
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
    <div className="space-y-4">
      {/* Image Container */}
      <motion.div
        className={`relative w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden border-2 ${
          isDragging 
            ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' 
            : 'border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
        } ${editable ? 'cursor-pointer' : ''} transition-all`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={editable ? { scale: 1.01 } : {}}
        whileTap={editable ? { scale: 0.99 } : {}}
      >
        {/* Image or Placeholder */}
        {displayUrl ? (
          <div className="relative w-full h-full">
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
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity"
              >
                <Camera className="h-12 w-12 text-white mb-2" />
                <p className="text-white font-medium">Click to change image</p>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-4">
              <ImageIcon className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Hero Image</h3>
            {editable && (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Click area ini atau drag & drop gambar
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <Upload className="h-4 w-4" />
                  <span>JPG, PNG, atau WebP (max 5MB)</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Upload Overlay */}
        <AnimatePresence>
          {editable && !isUploading && isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm"
            >
              <div className="text-center space-y-4">
                <Upload className="h-16 w-16 text-white mx-auto" />
                <p className="text-white font-medium">Drop image here</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm"
            >
              <div className="text-center space-y-4">
                <Loader2 className="h-16 w-16 text-white animate-spin mx-auto" />
                <p className="text-white font-medium">Uploading...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Button (Hover) */}
        {/* Removed - using overlay instead */}
      </motion.div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Instructions (Below Image) */}
      {editable && !isUploading && (
        <div className="mt-6 text-center space-y-4">
          <Button
            onClick={handleClick}
            className="px-8 py-6 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <Upload className="h-5 w-5 mr-2" />
            {imageUrl ? 'Change Image' : 'Upload Image'}
          </Button>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              atau drag & drop gambar ke area di atas
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              JPG, PNG, atau WebP (max 5MB) • Recommended: 800x800px
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
