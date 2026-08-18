import { useCallback, useState } from "react";

function useProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    return localStorage.getItem("profileImage");
  });

  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || "Player123"
  );

  const [email, setEmail] = useState(
    () => localStorage.getItem("email") || "player123@example.com"
  );

  const updateProfile = useCallback(
    (newUsername: string, newEmail: string) => {
      const trimmedUsername = newUsername.trim();
      const trimmedEmail = newEmail.trim();

      if (!trimmedUsername || !trimmedEmail) {
        return false;
      }

      setUsername(trimmedUsername);
      setEmail(trimmedEmail);

      localStorage.setItem("username", trimmedUsername);
      localStorage.setItem("email", trimmedEmail);

      return true;
    },
    []
  );

  const uploadAvatar = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;

      if (typeof image === "string") {
        setProfileImage(image);
        localStorage.setItem("profileImage", image);
      }
    };

    reader.readAsDataURL(file);
  }, []);

  return {
    username,
    email,
    profileImage,
    updateProfile,
    uploadAvatar,
  };
}

export default useProfile;
