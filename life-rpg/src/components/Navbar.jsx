function Navbar() {
  return (
    <nav className="border-b border-slate-700 bg-slate-950 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Life RPG
          </h1>
          <p className="text-xs text-purple-300">
            Your Life. Your Character.
          </p>
        </div>

        <div className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
          <button className="transition hover:text-purple-300">
            Dashboard
          </button>

          <button className="transition hover:text-purple-300">
            Quests
          </button>

          <button className="transition hover:text-purple-300">
            Rewards
          </button>

          <div className="rounded-lg bg-purple-500/10 px-3 py-2 text-purple-300">
            Level 7
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500 sm:hidden"
        >
          Menu
        </button>
      </div>
    </nav>
  );
}

export default Navbar;