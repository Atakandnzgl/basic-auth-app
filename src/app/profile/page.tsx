import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const email = session.user.email ?? "";
  const name = session.user.name ?? "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-700 rounded-2xl p-6 text-slate-100 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold text-slate-300">Email:</span>{" "}
            {email}
          </p>
          <p>
            <span className="font-semibold text-slate-300">Current name:</span>{" "}
            {name || "Not set"}
          </p>
        </div>

        <ProfileForm initialName={name} />

        <form
          action="/api/auth/signout"
          method="POST"
          className="mt-6"
        >
          <button
            className="w-full bg-red-600 text-white py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
