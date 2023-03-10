const MapPointSvg = ({ styles }) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 13.5c.756 0 1.404-.265 1.943-.794a2.575 2.575 0 0 0 .807-1.906 2.58 2.58 0 0 0-.807-1.908A2.676 2.676 0 0 0 11 8.1c-.756 0-1.403.264-1.941.792-.54.53-.809 1.165-.809 1.908 0 .742.27 1.378.809 1.906A2.67 2.67 0 0 0 11 13.5Zm0 9.922c2.796-2.52 4.87-4.81 6.222-6.868 1.352-2.059 2.028-3.886 2.028-5.484 0-2.453-.797-4.46-2.39-6.025C15.268 3.482 13.315 2.7 11 2.7c-2.315 0-4.268.782-5.862 2.345C3.546 6.609 2.75 8.617 2.75 11.07c0 1.598.676 3.425 2.028 5.484C6.13 18.613 8.204 20.903 11 23.423ZM11 27c-3.69-3.082-6.445-5.946-8.267-8.59C.911 15.767 0 13.32 0 11.07c0-3.375 1.106-6.064 3.318-8.066C5.528 1 8.09 0 11 0s5.471 1.001 7.682 3.004C20.894 5.006 22 7.695 22 11.07c0 2.25-.91 4.697-2.732 7.34C17.445 21.054 14.69 23.918 11 27Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="a"
          x1={11}
          y1={0}
          x2={11}
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

export default MapPointSvg;
