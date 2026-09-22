import { useCreative } from "../layout/CreativeContext";

/** A development wordmark and care motif, never presented as the approved logo. */
export const CareMark = ({
  size = 64,
  inverse = false,
}: {
  size?: number;
  inverse?: boolean;
}) => {
  const { theme } = useCreative();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      role="img"
      aria-label="Development care symbol"
    >
      <rect
        width="80"
        height="80"
        rx="26"
        fill={inverse ? theme.colors.accent : theme.colors.primary}
      />
      <path
        d="M40 19v42M19 40h42"
        stroke={inverse ? theme.colors.dark : theme.colors.paper}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle
        cx="58"
        cy="22"
        r="5"
        fill={inverse ? theme.colors.dark : theme.colors.accent}
      />
    </svg>
  );
};
export const BrandLogo = ({
  inverse = false,
  large = false,
}: {
  inverse?: boolean;
  large?: boolean;
}) => {
  const { theme, unit } = useCreative();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: theme.spacing.sm * unit,
        color: inverse ? theme.colors.paper : theme.colors.ink,
      }}
    >
      <CareMark size={(large ? 88 : 62) * unit} inverse={inverse} />
      <span
        style={{
          fontSize: (large ? 56 : 38) * unit,
          fontWeight: theme.typography.weight.bold,
          letterSpacing: "-0.045em",
        }}
      >
        Dr. Health
        <span
          style={{
            color: inverse ? theme.colors.accent : theme.colors.primary,
          }}
        >
          .
        </span>
      </span>
    </div>
  );
};
