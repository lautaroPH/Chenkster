const SendSvg = () => {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m18.636 15.67 1.716-5.15c1.5-4.498 2.25-6.747 1.062-7.934-1.187-1.187-3.436-.438-7.935 1.062L8.33 5.364C4.7 6.574 2.885 7.18 2.37 8.067a2.717 2.717 0 0 0 0 2.73c.515.888 2.33 1.493 5.96 2.704.584.194.875.291 1.119.454.236.158.439.361.597.597.163.244.26.535.454 1.118 1.21 3.63 1.816 5.446 2.703 5.962.844.49 1.887.49 2.731 0 .887-.516 1.492-2.331 2.703-5.962Z"
        stroke="url(#a)"
        strokeWidth={1.5}
      />
      <path
        d="m17.79 6.21-4.21 4.165"
        stroke="url(#b)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="a"
          x1={12}
          y1={2}
          x2={12}
          y2={36.762}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="b"
          x1={15.684}
          y1={8.293}
          x2={16.907}
          y2={9.529}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SendSvg;
