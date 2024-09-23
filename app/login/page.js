// app/components/SessionInfo.tsx
"use client";

import { useSession } from "next-auth/react";
import React from "react";

const SessionInfo = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>No active session</div>;
  }

  return (
    <div>
      <h1 className="text-xl  font-bold mb-4">Session Data:</h1>
      <pre className="bg-gray-100 p-4 rounded border border-gray-300 text-black">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
};

export default SessionInfo;
