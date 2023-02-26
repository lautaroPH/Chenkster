const VerificSvg = ({ styles }) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m4.49 12-1.122-1.829-2.127-.457.207-2.114L0 6l1.448-1.6-.207-2.114 2.127-.457L4.491 0 6.5.829 8.51 0l1.122 1.829 2.127.457-.207 2.114L13 6l-1.448 1.6.207 2.114-2.127.457L8.509 12 6.5 11.171 4.49 12Zm1.39-3.971L9.218 4.8l-.827-.829L5.88 6.4 4.61 5.2l-.828.8L5.88 8.029Z"
        fill="#3CD24B"
      />
      <defs>
        <linearGradient
          id="a"
          x1={6.5}
          y1={-0.571}
          x2={6.5}
          y2={22.571}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CD24B" />
          <stop offset={1} stopColor="#3CD24B" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default VerificSvg;
