import { useCallback, useEffect, useState } from "react";
import type { AuthUser } from "../api/auth";
import { fetchCurrentUser, updateProfile } from "../api/auth";

function useProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const applyUser = useCallback((user: AuthUser | null) => {
    if (!user) return;

    setUsername(user.username);
    setEmail(user.email);
    setProfileImage(user.avatar);
  }, []);

  useEffect(() => {
    let ignore = false;

    fetchCurrentUser()
      .then((user) => {
        if (!ignore) applyUser(user);
      })
      .catch((fetchError: Error) => {
        if (!ignore) setError(fetchError.message);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [applyUser]);

  const saveProfile = useCallback(
    async (newUsername: string, newEmail: string) => {
      const trimmedUsername = newUsername.trim();
      const trimmedEmail = newEmail.trim();

      if (!trimmedUsername || !trimmedEmail) {
        setError("Användarnamn och e-post får inte vara tomma.");
        return false;
      }

      setIsSaving(true);
      setError(null);

      try {
        const updated = await updateProfile({
          username: trimmedUsername,
          email: trimmedEmail,
        });

        applyUser(updated);

        return true;
      } catch (saveError) {
        setError(
          saveError instanceof Error
            ? saveError.message
            : "Kunde inte spara profilen."
        );

        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [applyUser]
  );

  const uploadAvatar = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Filen måste vara en bild.");
        return;
      }

      const reader = new FileReader();

      reader.onload = async () => {
        const image = reader.result;

        if (typeof image !== "string") return;

        setIsSaving(true);
        setError(null);

        try {
          const updated = await updateProfile({ avatar: image });

          applyUser(updated);
        } catch (uploadError) {
          setError(
            uploadError instanceof Error
              ? uploadError.message
              : "Kunde inte spara bilden."
          );
        } finally {
          setIsSaving(false);
        }
      };

      reader.readAsDataURL(file);
    },
    [applyUser]
  );

  return {
    username,
    email,
    profileImage,
    isLoading,
    isSaving,
    error,
    saveProfile,
    uploadAvatar,
  };
}

export default useProfile;
