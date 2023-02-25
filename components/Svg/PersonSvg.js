const PersonSvg = () => {
  return (
    <svg width={32} height={31} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="url(#a)" d="M5.191 25.51h20.763v3.229H5.191z" />
      <path
        d="M25.954 27.125v-2.583c0-1.37-.547-2.685-1.52-3.654a5.203 5.203 0 0 0-3.67-1.513H10.381a5.203 5.203 0 0 0-3.67 1.513 5.154 5.154 0 0 0-1.521 3.654v2.583"
        stroke="url(#b)"
        strokeWidth={3.096}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.572 14.208c2.867 0 5.191-2.313 5.191-5.167 0-2.853-2.324-5.166-5.19-5.166-2.867 0-5.191 2.313-5.191 5.166 0 2.854 2.324 5.167 5.19 5.167Z"
        fill="#fff"
        stroke="url(#c)"
        strokeWidth={3.096}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="a"
          x1={15.572}
          y1={25.51}
          x2={15.572}
          y2={31.123}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="b"
          x1={15.572}
          y1={19.375}
          x2={15.572}
          y2={32.845}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="c"
          x1={15.572}
          y1={3.875}
          x2={15.572}
          y2={21.835}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PersonSvg;
