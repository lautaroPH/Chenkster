const PencilSvg = () => {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={15} cy={15} r={15} fill="url(#a)" />
      <path
        d="M21.469 20.695H8.53a.562.562 0 0 0-.562.563v.633c0 .077.063.14.14.14h13.782c.077 0 .14-.063.14-.14v-.633a.562.562 0 0 0-.562-.563Zm-10.94-1.476c.036 0 .071-.004.106-.009l2.957-.519a.172.172 0 0 0 .093-.049l7.452-7.451a.175.175 0 0 0 0-.248L18.215 8.02a.174.174 0 0 0-.125-.051.174.174 0 0 0-.125.05l-7.45 7.452a.178.178 0 0 0-.05.093l-.519 2.957a.589.589 0 0 0 .165.524.596.596 0 0 0 .419.174Z"
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

export default PencilSvg;
