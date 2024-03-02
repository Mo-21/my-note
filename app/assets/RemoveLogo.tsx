export const RemoveLogo = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2" />
    <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" />
  </svg>
);
