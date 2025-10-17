import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-2xl relative">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                danger ? 'bg-red-100' : 'bg-yellow-100'
              }`}
            >
              <AlertTriangle size={24} className={danger ? 'text-[#EF4444]' : 'text-[#F59E0B]'} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-[#1F2937] mb-2">{title}</h3>
              <p className="text-sm text-[#6B7280]">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-[#6B7280] hover:text-[#1F2937] transition-colors p-2 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                danger
                  ? 'bg-[#EF4444] text-white hover:bg-[#DC2626]'
                  : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8]'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
