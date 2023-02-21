const LogoutSvg = () => {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={15} cy={15} r={15} fill="url(#a)" />
      <path
        d="M10.5 8.25a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h3.75a.75.75 0 1 0 0-1.5H10.5a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75h3.75a.75.75 0 1 0 0-1.5H10.5Z"
        fill="#F6F6F6"
      />
      <path
        d="M17.47 11.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06l1.72-1.72H13.5a.75.75 0 1 1 0-1.5h5.69l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
        fill="#F6F6F6"
      />
      <defs>
        <linearGradient
          id="a"
          x1={15}
          y1={0}
          x2={15}
          y2={52.143}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LogoutSvg;
