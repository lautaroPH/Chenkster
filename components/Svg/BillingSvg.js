const BillingSvg = () => {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={15} cy={15} r={15} fill="url(#a)" />
      <path
        d="M11.4 7.8a1.8 1.8 0 0 0-1.8 1.8v10.8a1.8 1.8 0 0 0 1.8 1.8h8.55a.45.45 0 1 0 0-.9H11.4a.9.9 0 0 1-.9-.9h9a.9.9 0 0 0 .9-.9V9.6a1.8 1.8 0 0 0-1.8-1.8h-7.2Zm4.95 4.95a1.35 1.35 0 1 1-2.7 0 1.35 1.35 0 0 1 2.7 0Zm-4.05 2.925a.675.675 0 0 1 .675-.675h4.05a.675.675 0 0 1 .675.675v.225a1.8 1.8 0 0 1-1.8 1.8h-1.8a1.8 1.8 0 0 1-1.8-1.8v-.225Z"
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

export default BillingSvg;
