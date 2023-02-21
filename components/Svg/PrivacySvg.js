const PrivacySvg = () => {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={15} cy={15} r={15} fill="url(#a)" />
      <path
        d="m15 6.75-6.75 3v4.5c0 4.163 2.88 8.055 6.75 9 3.87-.945 6.75-4.837 6.75-9v-4.5l-6.75-3Zm-.75 4.5h1.5v1.5h-1.5v-1.5Zm0 3h1.5v4.5h-1.5v-4.5Z"
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

export default PrivacySvg;
