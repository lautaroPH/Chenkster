const ItenarySvg = () => {
  return (
    <svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g
        clipPath="url(#a)"
        strokeWidth={3.096}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M2.331 3.5h6.993a4.66 4.66 0 0 1 4.662 4.667V24.5A3.502 3.502 0 0 0 10.49 21H2.33V3.5Z"
          stroke="url(#b)"
        />
        <path
          d="M25.642 3.5h-6.993a4.669 4.669 0 0 0-4.662 4.667V24.5a3.501 3.501 0 0 1 3.496-3.5h8.159V3.5Z"
          stroke="url(#c)"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1={8.159}
          y1={3.5}
          x2={8.159}
          y2={40}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="c"
          x1={19.814}
          y1={3.5}
          x2={19.814}
          y2={40}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h27.973v28H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ItenarySvg;
