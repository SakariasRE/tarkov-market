import { useRef, useState } from "react";
import {
  User,
  Mail,
  CalendarDays,
  Wallet,
  Upload,
  Pencil,
  Save,
  X,
} from "lucide-react";
import useProfile from "../hooks/useProfile";

function Profile() {
  const balance = Number(localStorage.getItem("balance")) || 500000;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    username,
    email,
    profileImage,
    updateProfile,
    uploadAvatar,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedEmail, setEditedEmail] = useState(email);

  const memberSince = "August 2026";

  function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    uploadAvatar(file);
  }

  function handleSave() {
    const success = updateProfile(
      editedUsername,
      editedEmail
    );

    if (success) {
      setIsEditing(false);
    }
  }

  function handleCancel() {
    setEditedUsername(username);
    setEditedEmail(email);
    setIsEditing(false);
  }

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Profile
            </h1>

            <p className="mt-1 text-sm text-neutral-400">
              View and manage your account information
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <Pencil size={17} aria-hidden="true" />
              Edit Profile
            </button>
          )}
        </div>

        <section
          className="mt-8 max-w-3xl rounded-lg border border-neutral-800 bg-neutral-900 p-6"
          aria-labelledby="profile-information-heading"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-950">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User
                  size={40}
                  className="text-neutral-400"
                  aria-hidden="true"
                />
              )}
            </div>

            <div>
              <h2
                id="profile-information-heading"
                className="text-xl font-semibold text-white"
              >
                {username}
              </h2>

              <p className="mt-1 text-sm text-neutral-400">
                Tarkov Market account
              </p>

              <input
                ref={fileInputRef}
                id="profile-image"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageUpload}
                className="sr-only"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <Upload size={17} aria-hidden="true" />
                Upload image
              </button>
            </div>
          </div>

          {isEditing ? (
            <div className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={editedUsername}
                  onChange={(event) =>
                    setEditedUsername(event.target.value)
                  }
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={editedEmail}
                  onChange={(event) =>
                    setEditedEmail(event.target.value)
                  }
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-300 px-4 py-2 font-semibold text-neutral-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Save size={17} aria-hidden="true" />
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-neutral-300 transition hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <X size={17} aria-hidden="true" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ProfileItem
                icon={<User size={18} aria-hidden="true" />}
                label="Username"
                value={username}
              />

              <ProfileItem
                icon={<Mail size={18} aria-hidden="true" />}
                label="Email"
                value={email}
              />

              <ProfileItem
                icon={<CalendarDays size={18} aria-hidden="true" />}
                label="Member Since"
                value={memberSince}
              />

              <ProfileItem
                icon={<Wallet size={18} aria-hidden="true" />}
                label="Balance"
                value={`₽ ${balance.toLocaleString()}`}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

type ProfileItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function ProfileItem({
  icon,
  label,
  value,
}: ProfileItemProps) {
  return (
    <article className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex items-center gap-3 text-neutral-400">
        {icon}

        <span className="text-sm">
          {label}
        </span>
      </div>

      <p className="mt-2 font-medium text-white">
        {value}
      </p>
    </article>
  );
}

export default Profile;
