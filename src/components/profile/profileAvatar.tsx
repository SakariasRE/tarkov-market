import { useRef } from "react";
import { User, Upload } from "lucide-react";

type ProfileAvatarProps = {
  username: string;
  profileImage: string | null;
  isSaving: boolean;
  onUpload: (file: File) => void;
};

function ProfileAvatar({
  username,
  profileImage,
  isSaving,
  onUpload,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) onUpload(file);
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-950">
        {profileImage ? (
          <img
            src={profileImage}
            alt="User profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <User size={40} className="text-neutral-400" aria-hidden="true" />
        )}
      </div>

      <div>
        <h2
          id="profile-information-heading"
          className="text-xl font-semibold text-white"
        >
          {username}
        </h2>

        <p className="mt-1 text-sm text-neutral-400">Tarkov Market account</p>

        <input
          ref={fileInputRef}
          id="profile-image"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleChange}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSaving}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <Upload size={17} aria-hidden="true" />
          {isSaving ? "Sparar…" : "Upload image"}
        </button>
      </div>
    </div>
  );
}

export default ProfileAvatar;
