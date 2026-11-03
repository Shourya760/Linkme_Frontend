import { Download } from 'lucide-react';
import { getPortfolioHost } from '../utils/portfolioUrl';

export default function QrModal({ isOpen, onClose, username, title }) {
  if (!isOpen) return null;

  const displayHandle = username || 'user';
  const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/${encodeURIComponent(displayHandle)}` : `https://${getPortfolioHost()}/${displayHandle}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(profileUrl)}&margin=10`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center space-y-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-zinc-900">
            {title || `QR Code for @${displayHandle}`}
          </h4>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 text-lg font-bold p-1 cursor-pointer"
          >
            ×
          </button>
        </div>

        <p className="text-xs text-zinc-500">
          Scan with any mobile camera to open this linkme profile.
        </p>

        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 flex justify-center">
          <img src={qrCodeUrl} alt={`QR Code for ${displayHandle}`} className="w-48 h-48 rounded-xl shadow-xs" />
        </div>

        <p className="text-xs font-mono font-medium text-zinc-600">
          {getPortfolioHost()}/{displayHandle}
        </p>

        <div className="flex gap-2 pt-2">
          <a
            href={qrCodeUrl}
            download={`linkme-${displayHandle}-qr.png`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
          >
            <Download size={14} />
            <span>Save Image</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
