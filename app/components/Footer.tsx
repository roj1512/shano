export default function Footer() {
  return (
    <footer className="border-t-2 border-[rgba(0,0,0,.05)] p-3 dark:border-[rgba(255,255,255,.0375)]">
      <div className="mx-auto flex w-full max-w-3xl justify-between gap-2 text-xs">
        <p className="opacity-50">&copy; 2022</p>
        <a
          href="https://github.com/roj1512/shano"
          className="opacity-50 duration-100 hover:opacity-100"
          target="_blank"
          rel="noreferrer"
        >
          سەرچاوە
        </a>
      </div>
    </footer>
  );
}
