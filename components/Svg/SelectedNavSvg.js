const SelectedNavSvg = () => {
  return (
    <svg width={7} height={7} fill="#3CD24B" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx={3.44} cy={3.424} rx={3.44} ry={3.424} fill="#3CD24B" />
      <defs>
        <linearGradient
          id="a"
          x1={3.44}
          y1={-0.326}
          x2={3.44}
          y2={12.881}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CD24B" />
          <stop offset={1} stopColor="#3CD24B" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SelectedNavSvg;
