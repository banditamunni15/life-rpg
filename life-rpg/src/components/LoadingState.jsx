function LoadingState({ message = "Loading your character..." }) {
  return (
    <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <div className="text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-purple-500" />

        <p className="text-sm text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}

export default LoadingState;