type ProfileFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function ProfileField({ icon, label, value }: ProfileFieldProps) {
  return (
    <article className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex items-center gap-3 text-neutral-400">
        {icon}

        <span className="text-sm">{label}</span>
      </div>

      <p className="mt-2 font-medium text-white">{value}</p>
    </article>
  );
}

export default ProfileField;
