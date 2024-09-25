import CategoryForm from "@/components/CategoryForm";
import DealForm from "@/components/DealForm";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex p-10 gap-10 justify-start">
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />

      <DealForm />
      <CategoryForm />
    </main>
  );
}
