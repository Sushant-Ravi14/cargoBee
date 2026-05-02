import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_SIZE_MB = 5;

const FileUpload = ({ label = 'Upload File', onFileSelect, accept = 'image/*,.pdf' }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const validate = (f) => {
    if (!ACCEPTED_TYPES.includes(f.type)) return 'Invalid file type. Please upload JPG, PNG, or PDF.';
    if (f.size > MAX_SIZE_MB * 1024 * 1024) return `File size must be under ${MAX_SIZE_MB}MB.`;
    return null;
  };

  const handleFile = (f) => {
    const err = validate(f);
    if (err) { setError(err); return; }
    setError('');
    setFile(f);
    onFileSelect?.(f);
  };

  return (
    <div>
      {label && <div className="text-sm font-bold text-textSecondary mb-2">{label}</div>}

      {!file ? (
        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer transition-all ${
            dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-gray-50'
          }`}
        >
          <Upload size={28} className="text-textSecondary mb-3" />
          <div className="text-sm font-bold text-accent">Click or drag to upload</div>
          <div className="text-xs text-textSecondary mt-1">JPG, PNG, PDF • Max {MAX_SIZE_MB}MB</div>
          <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
          <CheckCircle size={20} className="text-success shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-accent truncate">{file.name}</div>
            <div className="text-xs text-textSecondary">{(file.size / 1024).toFixed(0)} KB</div>
          </div>
          <button onClick={() => setFile(null)} className="p-1 text-textSecondary hover:text-error transition-colors">
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-error text-xs mt-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
