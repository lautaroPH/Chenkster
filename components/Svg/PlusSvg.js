const PlusSvg = () => {
  return (
    <svg width={33} height={33} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#a)">
        <circle cx={16.5} cy={12.5} r={12.5} fill="#fff" />
      </g>
      <path
        d="m23.985 13.076-14.09-.062M16.972 6l-.063 14.09"
        stroke="url(#b)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g filter="url(#c)">
        <circle cx={16.5} cy={12.5} r={12.5} fill="#fff" />
      </g>
      <path
        d="m23.985 13.076-14.09-.062M16.972 6l-.063 14.09"
        stroke="url(#d)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="b"
          x1={20.479}
          y1={9.538}
          x2={8.179}
          y2={21.729}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="d"
          x1={20.479}
          y1={9.538}
          x2={8.179}
          y2={21.729}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <filter
          id="a"
          x={0}
          y={0}
          width={33}
          height={33}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_331_4049"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_331_4049"
            result="shape"
          />
        </filter>
        <filter
          id="c"
          x={0}
          y={0}
          width={33}
          height={33}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_331_4049"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_331_4049"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PlusSvg;
