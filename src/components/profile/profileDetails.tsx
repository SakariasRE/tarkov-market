import { User, Mail, CalendarDays, Wallet } from "lucide-react";
import ProfileField from "./profileField";

type ProfileDetailsProps = {
  username: string;
  email: string;
  memberSince: string;
  balance: number;
};

function ProfileDetails({
  username,
  email,
  memberSince,
  balance,
}: ProfileDetailsProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProfileField
        icon={<User size={18} aria-hidden="true" />}
        label="Username"
        value={username}
      />

      <ProfileField
        icon={<Mail size={18} aria-hidden="true" />}
        label="Email"
        value={email}
      />

      <ProfileField
        icon={<CalendarDays size={18} aria-hidden="true" />}
        label="Member Since"
        value={memberSince}
      />

      <ProfileField
        icon={<Wallet size={18} aria-hidden="true" />}
        label="Balance"
        value={`₽ ${balance.toLocaleString()}`}
      />
    </div>
  );
}

export default ProfileDetails;
