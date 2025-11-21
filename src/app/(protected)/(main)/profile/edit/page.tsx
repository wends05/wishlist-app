import { Suspense } from "react";
import EditProfile from "./EditProfile";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProfile />
    </Suspense>
  );
}
