const SafetySvg = () => {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={15} cy={15} r={15} fill="url(#a)" />
      <path
        d="M21.238 8.987 15.265 6.95A.865.865 0 0 0 15 6.914a.865.865 0 0 0-.265.037L8.76 8.987a.421.421 0 0 0-.265.372v8.48c0 .155.1.359.222.455l6.059 4.722c.061.047.14.072.221.072a.36.36 0 0 0 .222-.072l6.059-4.722a.654.654 0 0 0 .221-.455v-8.48a.414.414 0 0 0-.262-.372Zm-3.03 3.002-3.737 5.145a.284.284 0 0 1-.357.085.284.284 0 0 1-.1-.085l-2.222-3.059a.141.141 0 0 1 .114-.223h.97c.09 0 .176.044.229.116l1.137 1.565 2.653-3.653a.283.283 0 0 1 .228-.116h.97c.115.002.182.132.115.225Z"
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

export default SafetySvg;
