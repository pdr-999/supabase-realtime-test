import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
let supabase = createClient(supabaseUrl!, supabaseKey!);
const sub = () => {
  console.log("Started subscribing....");
  const {} = supabase
    .channel("any")
    .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
      console.log("Change received!", payload);
    })
    .subscribe();
};
export default function Home() {
  useEffect(() => {
    sub();
  }, []);
  return (
    <>
      Hello{" "}
      <button
        onClick={() => {
          console.log("clicked");
          supabase
            .from("todos")
            .insert({
              task: "study",
              order: 1,
            })
            .then(console.log);
        }}
      >
        insert
      </button>
    </>
  );
}
