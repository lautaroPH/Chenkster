const LanguageSvg = () => {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={15} cy={15} r={15} fill="url(#a)" />
      <path
        d="M15 7.2a.975.975 0 0 1 .975.975v5.85h5.85a.975.975 0 1 1 0 1.95h-5.85v5.85a.975.975 0 1 1-1.95 0v-5.85h-5.85a.975.975 0 1 1 0-1.95h5.85v-5.85A.975.975 0 0 1 15 7.2Z"
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

export default LanguageSvg;
