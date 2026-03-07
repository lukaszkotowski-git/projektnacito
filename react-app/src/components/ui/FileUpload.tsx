import React, { useCallback, useRef } from 'react'

interface FileUploadProps {
  label?: string
  file?: File | null
  onFileChange: (file: File | null) => void
  multiple?: boolean
  required?: boolean
  accept?: string
  placeholder?: string
  className?: string
}

export function FileUpload({ label, file, onFileChange, multiple = false, required = false, accept, placeholder = 'Kliknij tutaj lub przeciągnij pliki', className = '' }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = useCallback((filesList: FileList | null) => {
    if (!filesList || filesList.length === 0) {
      onFileChange(null)
      return
    }
    onFileChange(filesList[0])
  }, [onFileChange])

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleFiles(e.dataTransfer.files)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">{label}</label>
      )}

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="border-2 border-dashed border-[#E5DED4] rounded-2xl p-6 text-center hover:bg-[#FDFBF7] transition-colors relative"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          required={required}
          multiple={multiple}
          onChange={handleInputChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="text-xs text-gray-400">
          {file ? file.name : placeholder}
        </div>
      </div>
    </div>
  )
}
