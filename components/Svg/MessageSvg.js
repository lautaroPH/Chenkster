const MessageSvg = () => {
  return (
    <svg width={27} height={27} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.697 2.7h21.58v16.2H4.274l-1.578 1.58V2.7Zm0-2.7A2.695 2.695 0 0 0 .013 2.7L0 27l5.395-5.4h18.881a2.707 2.707 0 0 0 2.698-2.7V2.7c0-1.485-1.214-2.7-2.698-2.7H2.697Zm2.698 13.5h16.184v2.7H5.395v-2.7Zm0-4.05h16.184v2.7H5.395v-2.7Zm0-4.05h16.184v2.7H5.395V5.4Z"
        fill="url(#a)"
      />
      <defs>
        <linearGradient
          id="a"
          x1={13.487}
          y1={0}
          x2={13.487}
          y2={46.929}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0973E1" />
          <stop offset={1} stopColor="#0973E1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MessageSvg;
