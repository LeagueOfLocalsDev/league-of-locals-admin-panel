export default function MainPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
          Welcome to League of Locals
        </h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-8 opacity-80"></div>
      </div>
    </main>
  );
}
