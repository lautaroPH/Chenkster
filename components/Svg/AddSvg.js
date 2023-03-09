const AddSvg = () => {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={16} cy={16} r={13.333} stroke="url(#a)" strokeWidth={3} />
      <path
        d="M20 16h-4m0 0h-4m4 0v-4m0 4v4"
        stroke="url(#b)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="a"
          x1={16}
          y1={2.667}
          x2={16}
          y2={49.016}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="b"
          x1={16}
          y1={12}
          x2={16}
          y2={25.905}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AddSvg;
