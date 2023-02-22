const RingBellSvg = () => {
  return (
    <svg width={21} height={28} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m18.87 22.177.458.62a.587.587 0 0 1-.157.844.564.564 0 0 1-.3.087H.57a.565.565 0 0 1-.51-.322.59.59 0 0 1 .053-.609l.458-.62V12.09c0-2.47.964-4.838 2.68-6.584A9.07 9.07 0 0 1 9.72 2.78a9.07 9.07 0 0 1 6.47 2.727 9.394 9.394 0 0 1 2.68 6.584v10.086ZM6.862 24.892h5.718c0 .772-.301 1.512-.837 2.057a2.834 2.834 0 0 1-2.022.852 2.834 2.834 0 0 1-2.022-.852 2.935 2.935 0 0 1-.837-2.057Z"
        fill="url(#a)"
      />
      <circle cx={16} cy={5} r={5} fill="#3CD24B" />
      <defs>
        <linearGradient
          id="a"
          x1={9.721}
          y1={2.78}
          x2={9.721}
          y2={46.269}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RingBellSvg;
