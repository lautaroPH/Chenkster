const PencilEditSvg = () => {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#a)">
        <path
          d="m11.967 3.399.772-.772a3.277 3.277 0 0 1 4.634 4.634l-.772.772M11.967 3.4s.096 1.641 1.544 3.09c1.449 1.448 3.09 1.544 3.09 1.544M11.967 3.4 4.866 10.5c-.481.481-.722.722-.929.987a5.462 5.462 0 0 0-.623 1.009c-.145.303-.253.626-.468 1.271l-.911 2.735M16.6 8.033l-7.1 7.101c-.482.481-.722.722-.988.929a5.468 5.468 0 0 1-1.009.623c-.303.145-.626.253-1.271.468l-2.735.911m0 0-.668.223a.884.884 0 0 1-1.118-1.118l.223-.668m1.563 1.563-1.563-1.563"
          stroke="url(#b)"
          strokeWidth={1.5}
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1={10}
          y1={1.667}
          x2={10}
          y2={30.635}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PencilEditSvg;
