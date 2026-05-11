'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Check, Loader2, AlertCircle } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProfilePictureUploadProps {
  currentImageUrl?: string;
  onUploadSuccess?: (url: string) => void;
  userId?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
}

export function ProfilePictureUpload({
  currentImageUrl,
  onUploadSuccess,
  userId,
  size = 'lg',
  editable = true,
}: ProfilePictureUploadProps) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return 'Format file harus JPG, PNG, atau WebP';
    }

    // Check file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      return 'Ukuran file maksimal 2MB';
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
      const fileName = `profile/${userId || 'default'}/${Date.now()}.${fileExt}`;
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
        toast.success('Profile picture berhasil diupload!');
        
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
    <div className="flex flex-col items-center gap-4">
      {/* Profile Picture Container */}
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl ${
          editable ? 'cursor-pointer' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={editable ? { scale: 1.05 } : {}}
        whileTap={editable ? { scale: 0.95 } : {}}
      >
        {/* Image or Placeholder */}
        {displayUrl ? (
          <Image
            src={displayUrl}
            alt="Profile"
            fill
            className="object-cover"
            sizes={`(max-width: 768px) ${sizeClasses[size]}, ${sizeClasses[size]}`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
            <Camera className={`${iconSizes[size]} text-white`} />
          </div>
        )}

        {/* Upload Overlay */}
        <AnimatePresence>
          {editable && !isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isDragging ? 1 : 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <Upload className={`${iconSizes[size]} text-white`} />
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
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
            >
              <Loader2 className={`${iconSizes[size]} text-white animate-spin`} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Button (Hover) */}
        {editable && !isUploading && displayUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity"
          >
            <div className="bg-white dark:bg-gray-900 rounded-full p-3">
              <Camera className="h-5 w-5 text-gray-900 dark:text-white" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Instructions */}
      {editable && !imageUrl && !isUploading && (
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Click atau drag & drop untuk upload
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            JPG, PNG, atau WebP (max 2MB)
          </p>
        </div>
      )}

      {/* Change Picture Button */}
      {editable && imageUrl && !isUploading && (
        <button
          onClick={handleClick}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white text-sm font-medium transition-all shadow-lg hover:shadow-xl"
        >
          Ganti Foto
        </button>
      )}
    </div>
  );
}
