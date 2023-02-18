const ArrowSvg = () => {
  return (
    <svg width={23} height={19} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23 8.267H4.781l6.612-6.524L9.626 0 0 9.5 9.626 19l1.767-1.743-6.612-6.524H23V8.267Z"
        fill="url(#a)"
      />
      <defs>
        <linearGradient
          id="a"
          x1={11.5}
          y1={0}
          x2={11.5}
          y2={33.024}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ArrowSvg;
