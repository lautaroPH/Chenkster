const PaymentSvg = () => {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={15} cy={15} r={15} fill="url(#a)" />
      <path
        d="M21.715 14.121c.543 0 .77-.698.329-1.02L15.33 8.219a.56.56 0 0 0-.662 0l-6.713 4.884c-.44.32-.214 1.02.33 1.02h1.089v6.573H8.109a.141.141 0 0 0-.14.141v.914c0 .077.063.14.14.14h13.782c.077 0 .14-.063.14-.14v-.914a.141.141 0 0 0-.14-.14h-1.266V14.12h1.09ZM15 9.458l4.765 3.466h-9.53L15 9.458Zm-4.36 4.663h2.057v6.574h-2.056v-6.574Zm3.323 0h2.057v6.574h-2.057v-6.574Zm5.396 6.574h-2.074v-6.574h2.074v6.574Z"
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

export default PaymentSvg;
