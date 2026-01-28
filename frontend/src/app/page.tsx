import { enmRole } from "@jobboard/shared/types";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <div>
        <h1>Shared Test</h1>
        <p>Role Admin: {enmRole.admin}</p>
      </div>
    </div>
  );
}
