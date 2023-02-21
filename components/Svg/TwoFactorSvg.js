const TwoFactorSvg = () => {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={15} cy={15} r={15} fill="url(#a)" />
      <path
        d="m11.4 18.708-1.2-1.201-.847.846L11.4 20.4l3.6-3.6-.846-.846-2.754 2.754ZM21.6 22.8h-2.4v-1.2h2.4v-7.2h-2.4V9.6a2.403 2.403 0 0 0-2.4-2.4V6a3.604 3.604 0 0 1 3.6 3.6v3.6h1.2a1.201 1.201 0 0 1 1.2 1.2v7.2a1.201 1.201 0 0 1-1.2 1.2Z"
        fill="#F6F6F6"
      />
      <path
        d="M16.8 13.2h-1.2V9.6a3.6 3.6 0 0 0-7.2 0v3.6H7.2A1.2 1.2 0 0 0 6 14.4v7.2a1.2 1.2 0 0 0 1.2 1.2h9.6a1.2 1.2 0 0 0 1.2-1.2v-7.2a1.2 1.2 0 0 0-1.2-1.2ZM9.6 9.6a2.4 2.4 0 0 1 4.8 0v3.6H9.6V9.6Zm7.2 12H7.2v-7.2h9.6v7.2Z"
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

export default TwoFactorSvg;
