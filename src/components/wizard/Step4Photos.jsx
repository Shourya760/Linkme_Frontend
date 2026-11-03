import { useState } from 'react';
import { Upload, Plus, Trash2, Image as ImageIcon, Star } from 'lucide-react';
import { uploadImage } from '../../services/userServices.js';

const SUGGESTED_INTERESTS = [
  'UI/UX Design', 'React & Vite', 'Typography', 'AI & Prompts', 'Productivity',
  'Open Source', 'Photography', 'Branding', 'Mobile Apps', 'Micro-SaaS',
];

export default function Step4Photos({
  profile,
  addPhoto,
  removePhoto,
  addInterest,
  removeInterest,
  addAchievement,
  removeAchievement,
}) {
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [showAddPhoto, setShowAddPhoto] = useState(false);

  const [newInterest, setNewInterest] = useState('');
  const [newAchTitle, setNewAchTitle] = useState('');
  const [newAchYear, setNewAchYear] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Please choose an image under 2MB for fastest loading.');
      return;
    }
    try {
      const result = await uploadImage(file);
      setPhotoPreview(result.url);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCreatePhoto = (e) => {
    e.preventDefault();
    if (!photoTitle.trim()) return;
    if (!photoPreview) {
      alert('Upload an image before adding this portfolio item.');
      return;
    }

    addPhoto({
      url: photoPreview,
      title: photoTitle.trim(),
      caption: photoCaption.trim(),
      link: photoLink.trim(),
    });

    setPhotoTitle('');
    setPhotoCaption('');
    setPhotoLink('');
    setPhotoPreview('');
    setShowAddPhoto(false);
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    addInterest(newInterest);
    setNewInterest('');
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!newAchTitle.trim()) return;
    addAchievement(newAchTitle, newAchYear);
    setNewAchTitle('');
    setNewAchYear('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-zinc-900 tracking-tight">4. Photos, Portfolio Media & Milestones</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Showcase visual portfolio items, photos, focus skills, and key accomplishments.</p>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
              <ImageIcon size={16} className="text-zinc-600" />
              <span>Photo Showcase & Portfolio Cards</span>
            </h3>
            <p className="text-xs text-zinc-500">Add photos of your projects, designs, workspace, or photography.</p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddPhoto(!showAddPhoto)}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Photo</span>
          </button>
        </div>

        {showAddPhoto && (
          <form onSubmit={handleCreatePhoto} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-zinc-800">Add New Photo Card</h4>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-700">Choose Image Source</label>
              <label className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-800 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs transition cursor-pointer">
                <input type="file" onChange={handleFileUpload} accept="image/*" className="sr-only" />
                <Upload size={13} />
                <span>Upload Image File</span>
              </label>

              {photoPreview && (
                <div className="mt-2 flex items-center gap-3 p-2 bg-white rounded-xl border border-zinc-200">
                  <img src={photoPreview} alt="Preview" className="w-16 h-12 object-cover rounded-lg border" />
                  <span className="text-xs text-emerald-600 font-medium">✓ Image loaded and ready</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Card Title</label>
                <input
                  type="text"
                  required
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  placeholder="e.g. Brand Identity System"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Click-through Link (optional)</label>
                <input
                  type="url"
                  value={photoLink}
                  onChange={(e) => setPhotoLink(e.target.value)}
                  placeholder="https://dribbble.com/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Short Caption / Note</label>
              <input
                type="text"
                value={photoCaption}
                onChange={(e) => setPhotoCaption(e.target.value)}
                placeholder="e.g. Built for over 50,000 active developers"
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddPhoto(false)} className="px-3 py-1.5 text-xs text-zinc-600 hover:text-zinc-900 transition">
                Cancel
              </button>
              <button type="submit" className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer">
                Save Photo Card
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {profile.photos?.length > 0 ? (
            profile.photos.map((item) => (
              <div key={item.id} className="group relative rounded-xl border border-zinc-200 overflow-hidden bg-white shadow-2xs">
                <div className="aspect-4/3 w-full bg-zinc-100 overflow-hidden relative">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <button
                    type="button"
                    onClick={() => removePhoto(item.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition cursor-pointer"
                    title="Delete photo"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-bold text-zinc-900 truncate">{item.title}</p>
                  {item.caption && <p className="text-[11px] text-zinc-500 truncate mt-0.5">{item.caption}</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-6 border border-dashed border-zinc-200 rounded-xl">
              <p className="text-xs text-zinc-400">No photos added yet.</p>
              <button type="button" onClick={() => setShowAddPhoto(true)} className="mt-1 text-xs text-zinc-900 font-semibold hover:underline">
                + Add your first showcase photo
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">Interests & Skills Tags</h3>
          <p className="text-xs text-zinc-500">Tags highlighting your expertise, tools, or subjects of interest.</p>
        </div>

        <form onSubmit={handleAddInterest} className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="e.g. Product Strategy, AI Interfaces..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
          />
          <button type="submit" className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1">
            <Plus size={14} />
            <span>Add Tag</span>
          </button>
        </form>

        <div>
          <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">Quick Add Suggestions:</span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_INTERESTS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addInterest(tag)}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 transition cursor-pointer"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-zinc-100">
          {profile.interests?.length > 0 ? (
            profile.interests.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-800 rounded-full">
                <span>{item}</span>
                <button type="button" onClick={() => removeInterest(item)} className="text-zinc-400 hover:text-red-500 transition cursor-pointer" title="Remove tag">
                  ×
                </button>
              </span>
            ))
          ) : (
            <p className="text-xs text-zinc-400">No tags added yet.</p>
          )}
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">Key Milestones & Achievements</h3>
          <p className="text-xs text-zinc-500">Notable accolades, product launches, talks, or career milestones.</p>
        </div>

        <form onSubmit={handleAddAchievement} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            value={newAchTitle}
            onChange={(e) => setNewAchTitle(e.target.value)}
            placeholder="e.g. Featured on Product Hunt / TechCrunch"
            className="sm:col-span-8 px-3.5 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
          />
          <input
            type="number"
            min="1900"
            max="2200"
            step="1"
            value={newAchYear}
            onChange={(e) => setNewAchYear(e.target.value)}
            placeholder="Year (2024)"
            className="sm:col-span-2 px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
          />
          <button type="submit" className="sm:col-span-2 px-3 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold hover:bg-zinc-800 transition flex items-center justify-center gap-1 cursor-pointer">
            <Plus size={14} />
            <span>Add</span>
          </button>
        </form>

        <div className="space-y-2 pt-1">
          {profile.achievements?.length > 0 ? (
            profile.achievements.map((ach) => (
              <div key={ach.id} className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs">
                <div className="flex items-center gap-2">
                  <Star size={13} className="text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-zinc-800">{ach.title}</span>
                  {ach.year && <span className="text-[10px] font-mono text-zinc-500 bg-white border border-zinc-200 px-1.5 py-0.2 rounded">{ach.year}</span>}
                </div>
                <button type="button" onClick={() => removeAchievement(ach.id)} className="text-zinc-400 hover:text-red-500 transition cursor-pointer p-1" title="Delete achievement">
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-zinc-400">No milestones added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
