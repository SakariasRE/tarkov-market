import { useState } from "react";
import { Pencil } from "lucide-react";
import useProfile from "../hooks/useProfile";
import useBalanceContext from "../hooks/useBalanceContext";
import PageHeading from "../components/ui/pageHeading";
import ErrorMessage from "../components/ui/errorMessage";
import StatusPanel from "../components/ui/statusPanel";
import ProfileAvatar from "../components/profile/profileAvatar";
import ProfileEditForm from "../components/profile/profileEditForm";
import ProfileDetails from "../components/profile/profileDetails";

function Profile() {
  const { balance } = useBalanceContext();

  const {
    username,
    email,
    profileImage,
    isLoading,
    isSaving,
    error,
    saveProfile,
    uploadAvatar,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const memberSince = "August 2026";

  function startEditing() {
    setEditedUsername(username);
    setEditedEmail(email);
    setIsEditing(true);
  }

  async function handleSave() {
    const success = await saveProfile(editedUsername, editedEmail);

    if (success) {
      setIsEditing(false);
    }
  }

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeading
            title="Profile"
            description="View and manage your account information"
          />

          {!isEditing && !isLoading && (
            <button
              type="button"
              onClick={startEditing}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <Pencil size={17} aria-hidden="true" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="mt-8 max-w-3xl">
          <ErrorMessage message={error} />

          {isLoading ? (
            <StatusPanel message="Laddar profilen…" isBusy />
          ) : (
            <section
              className="rounded-lg border border-neutral-800 bg-neutral-900 p-6"
              aria-labelledby="profile-information-heading"
            >
              <ProfileAvatar
                username={username}
                profileImage={profileImage}
                isSaving={isSaving}
                onUpload={uploadAvatar}
              />

              {isEditing ? (
                <ProfileEditForm
                  username={editedUsername}
                  email={editedEmail}
                  isSaving={isSaving}
                  onUsernameChange={setEditedUsername}
                  onEmailChange={setEditedEmail}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <ProfileDetails
                  username={username}
                  email={email}
                  memberSince={memberSince}
                  balance={balance}
                />
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
