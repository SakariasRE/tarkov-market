import { Save, X } from "lucide-react";

const INPUT_CLASS =
  "w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300";

type ProfileEditFormProps = {
  username: string;
  email: string;
  isSaving: boolean;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

function ProfileEditForm({
  username,
  email,
  isSaving,
  onUsernameChange,
  onEmailChange,
  onSave,
  onCancel,
}: ProfileEditFormProps) {
  return (
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
          value={username}
          onChange={(event) => onUsernameChange(event.target.value)}
          className={INPUT_CLASS}
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
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          className={INPUT_CLASS}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-300 px-4 py-2 font-semibold text-neutral-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <Save size={17} aria-hidden="true" />
          {isSaving ? "Sparar…" : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-neutral-300 transition hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <X size={17} aria-hidden="true" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProfileEditForm;
