import type { ReactNode } from "react";
export function Check({ children }: { children: ReactNode }) {
  return (
    <div className="callout check">
      <strong>Check before continuing</strong>
      <div>{children}</div>
    </div>
  );
}
export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="callout">
      <strong>Keep in mind</strong>
      <div>{children}</div>
    </div>
  );
}
export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="table-scroll" tabIndex={0} aria-label="Scrollable reference table">
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
