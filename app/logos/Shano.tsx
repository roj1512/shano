export default function Shano({ animated }: { animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="25"
      height="25"
      className="fill-ourblack dark:fill-white"
    >
      <path
        fillRule="evenodd"
        d="M50 90c22.091 0 40-17.909 40-40S72.091 10 50 10 10 27.909 10 50s17.909 40 40 40Zm0 10c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Z"
        clipRule="evenodd"
      />
      <path
        d="M75 50c0 13.807-11.193 25-25 25S25 63.807 25 50s11.193-25 25-25 25 11.193 25 25Z"
        className={`duration-100 ${animated ? "animated-logo-path" : ""}`}
      />
    </svg>
  );
}
