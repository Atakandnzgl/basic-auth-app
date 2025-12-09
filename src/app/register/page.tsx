"use client";
import {useState, type ChangeEvent, type FormEvent, } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
    const rputer = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };
    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
            setError("All fields are required.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Something went wrong.");
                setLoading(false);
                return;
            }
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                rputer.push("/login");
            }, 1000);
        } catch (err) {
            setError("Something went wrong.");
            setLoading(false);
        }
    };
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="border rounded-lg p-6 shadow-sm max-w-sm w-full space-y-4 bg-white">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-center">Create Account</h1>
          <p className="text-sm text-gray-600 text-center">
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
  <Input
    label="Name"
    name="name"
    placeholder="John Doe"
    value={form.name}
    onChange={handleChange}
    disabled={loading || success}
  />

  <Input
    label="Email"
    type="email"
    name="email"
    placeholder="john@example.com"
    value={form.email}
    onChange={handleChange}
    disabled={loading || success}
  />

  <Input
    label="Password"
    type="password"
    name="password"
    placeholder="••••••••"
    value={form.password}
    onChange={handleChange}
    disabled={loading || success}
  />

  {error && (
    <div className="text-sm text-red-400 text-center">{error}</div>
  )}

  {success && (
    <div className="text-sm text-emerald-400 text-center">
      Account created successfully! Redirecting...
    </div>
  )}

  <Button
    type="submit"
    disabled={loading || success}
    fullWidth
  >
    {loading ? "Creating account..." : "Register"}
  </Button>
</form>


        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}    