export function Footer() {
  return (
    <footer className="bg-[#bec3c7] px-4 py-10 text-ink md:px-9">
      <div className="mx-auto grid max-w-experience gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="text-sm uppercase">Stay connected</p>
          <p className="mt-2 max-w-md text-lg">Receive e-mail updates on exhibitions, events, and museum stories.</p>
        </div>
        <form className="flex max-w-lg gap-2">
          <input
            aria-label="Email"
            placeholder="Email"
            className="min-w-0 flex-1 rounded-full border-2 border-ink bg-pearl px-5 py-3 outline-none"
          />
          <button className="rounded-full bg-ink px-5 py-3 text-pearl">Subscribe</button>
        </form>
        <div className="text-start md:text-end">
          <p className="font-display text-3xl">Al Fahidi Fort</p>
          <p className="mt-1 text-sm">Dubai Museum Experience</p>
        </div>
      </div>
    </footer>
  );
}
