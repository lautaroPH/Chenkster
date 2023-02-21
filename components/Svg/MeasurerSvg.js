const MeasurerSvg = () => {
  return (
    <svg width={60} height={60} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.692 42.95c-1.146.623-2.59.202-3.12-.99a29.84 29.84 0 1 1 54.407.284c-.542 1.187-1.99 1.593-3.13.959l-1.086-.604c-1.14-.635-1.538-2.07-1.02-3.267a23.87 23.87 0 1 0-43.905-.23c.506 1.202.093 2.633-1.054 3.256l-1.091.593Z"
        fill="#E4E4E4"
      />
      <path
        d="M5.692 42.95c-1.146.623-2.59.201-3.12-.99a29.84 29.84 0 0 1 52.283-28.388c.712 1.094.279 2.534-.868 3.157l-1.092.593c-1.147.622-2.572.19-3.304-.89a23.872 23.872 0 0 0-41.753 22.67c.506 1.202.093 2.633-1.054 3.256l-1.091.593Z"
        fill="#f00"
      />
      <path
        d="m23.385 24.244-7.014 6.144a1.201 1.201 0 0 0 0 1.85 1.556 1.556 0 0 0 2.005 0l6.006-5.263 3.667 3.208a1.556 1.556 0 0 0 2.005 0l6.357-5.549 1.505 1.316c.267.234.622.26.902.16s.54-.352.54-.721v-4.391c.016-.477-.407-.788-.843-.788H33.5c-.362 0-.656.194-.788.47a.725.725 0 0 0 .189.874l1.45 1.269-5.293 4.628-3.668-3.207a1.556 1.556 0 0 0-2.005 0Z"
        fill="url(#b)"
        stroke="url(#c)"
        strokeWidth={0.542}
      />
      <defs>
        <linearGradient
          id="a"
          x1={64.156}
          y1={48.696}
          x2={-5.968}
          y2={48.696}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6BD5BF" />
          <stop offset={0.16} stopColor="#32D172" />
          <stop offset={0.268} stopColor="#8ACD41" />
          <stop offset={0.658} stopColor="#F3AF3D" />
          <stop offset={0.804} stopColor="#FF7A00" />
          <stop offset={1} stopColor="#FF2E00" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={35.541}
          y1={26.901}
          x2={19.525}
          y2={26.901}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52D060" />
          <stop offset={0.396} stopColor="#EDB13E" />
          <stop offset={1} stopColor="#FF7501" />
        </linearGradient>
        <linearGradient
          id="c"
          x1={35.541}
          y1={26.901}
          x2={19.525}
          y2={26.901}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52D060" />
          <stop offset={0.396} stopColor="#EDB13E" />
          <stop offset={1} stopColor="#FF7501" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MeasurerSvg;
