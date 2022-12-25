export default function Footer() {
  return (
    <footer className="p-3 border-t-2 border-[rgba(0,0,0,.05)] dark:border-[rgba(255,255,255,.0375)]">
      <div className="text-xs w-full mx-auto max-w-3xl gap-2 flex justify-between">
        <p className="opacity-50">
          &copy; 2022
        </p>
        <a
          href="https://github.com/roj1512/shano"
          className="text-shano hover:opacity-50 duration-100"
          target="_blank"
          rel="noreferrer"
        >
          سەرچاوە
        </a>
      </div>
    </footer>
  );
}
