import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";

type MenuItem = {
  id: number;
  name: string;
}

export default function Home() {
  
  const [menu, setMenu] = useState<MenuItem[]>([])
  
  return (
    <main className="w-full h-full">
    <div className=" ml-10 w-full ustify-center items-center">Penis</div>
    
    {menu.map((m) => (
      <h1 key={m.id}>{m.name}</h1>
    ))}

    </main>
  );
}
