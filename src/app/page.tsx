import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">
                Basic Auth App
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Authentication demo built with Next.js, Prisma, and NextAuth.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Link
                href="/register"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/50"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] border border-slate-600 hover:border-slate-500"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
