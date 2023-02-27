const SearchSvg = () => {
  return (
    <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.358 2.478a3.875 3.875 0 0 0-2.726 1.117 3.796 3.796 0 0 0-1.129 2.698c0 1.012.406 1.983 1.13 2.698a3.875 3.875 0 0 0 2.725 1.118A3.875 3.875 0 0 0 9.104 8.97a3.796 3.796 0 0 0 1.109-2.678 3.796 3.796 0 0 0-1.13-2.698 3.875 3.875 0 0 0-2.725-1.117Zm5.294 7.3a6.248 6.248 0 0 0 1.064-3.485c0-1.669-.67-3.27-1.862-4.45A6.391 6.391 0 0 0 6.358 0a6.391 6.391 0 0 0-4.496 1.843A6.261 6.261 0 0 0 0 6.293c0 1.67.67 3.27 1.862 4.45a6.405 6.405 0 0 0 8.02.788l1.898 1.881a1.26 1.26 0 0 0 1.77.002 1.23 1.23 0 0 0 .002-1.752l-1.9-1.884Z"
        fill="url(#a)"
      />
      <defs>
        <linearGradient
          id="a"
          x1={6.959}
          y1={0}
          x2={6.959}
          y2={23.944}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SearchSvg;
