type ScoreTableProps = {
  columns: string[];
  rows: Array<{
    name: string;
    values: number[];
    total: number;
  }>;
};

export function ScoreTable({ columns, rows }: ScoreTableProps) {
  return (
    <div className="pixel-frame overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,27,42,0.98),rgba(6,17,28,0.98))]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-[0.22em] text-[#8fc6e7]">
              <th className="sticky left-0 bg-[#10283c] px-4 py-3 text-left">Crew</th>
              {columns.map((column) => (
                <th key={column} className="px-3 py-3 text-center">
                  {column}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-[#f0c34d]">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-white/[0.06] last:border-b-0">
                <td className="sticky left-0 bg-[#0f2436] px-4 py-3 font-black uppercase tracking-[0.08em] text-[#fff4cf]">
                  {row.name}
                </td>
                {row.values.map((value, index) => (
                  <td
                    key={`${row.name}-${columns[index]}`}
                    className={`px-3 py-3 text-center font-bold ${
                      value >= 0 ? "text-[#d7ecf9]" : "text-[#ff9a80]"
                    }`}
                  >
                    {value}
                  </td>
                ))}
                <td className="px-4 py-3 text-center font-black text-[#f3c55d]">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
