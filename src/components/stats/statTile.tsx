type StatTileProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

function StatTile({ title, value, description, icon }: StatTileProps) {
  return (
    <article className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-400">{title}</p>

          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>

        <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-2 text-amber-200">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-sm text-neutral-500">{description}</p>
    </article>
  );
}

export default StatTile;
