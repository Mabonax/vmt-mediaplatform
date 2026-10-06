import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import type { PromoContent } from "../../../engine/schemas/promo";
import { BrandLogo, CareMark } from "../../../components/brand/BrandLogo";
import {
  AppointmentSlot,
  CTA,
  DoctorCard,
  GlassCard,
  ServiceCard,
} from "../../../components/cards/Cards";
import { DeviceFrame } from "../../../components/devices/DeviceFrame";
import { useCreative } from "../../../components/layout/CreativeContext";
import { SceneLayout } from "../../../components/layout/SceneLayout";
import {
  MaskReveal,
  Parallax,
  ScaleIn,
  SlideIn,
  SpringReveal,
  Stagger,
  TypeReveal,
} from "../../../components/motion/primitives";
import {
  BodyText,
  DisplayText,
  Eyebrow,
} from "../../../components/typography/Text";
import type { PromoSceneId } from "../compositions/timeline";
import { assetRegistry } from "../assets/manifest";

const CopyBlock = ({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children?: ReactNode;
}) => {
  const { theme, unit } = useCreative();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md * unit,
      }}
    >
      <SlideIn>
        <Eyebrow>{step}</Eyebrow>
      </SlideIn>
      <SlideIn delay={0.06}>
        <DisplayText>{title}</DisplayText>
      </SlideIn>
      {children && (
        <SlideIn delay={0.12}>
          <BodyText>{children}</BodyText>
        </SlideIn>
      )}
    </div>
  );
};
const Center = ({ children }: { children: ReactNode }) => {
  const { metrics, theme, design } = useCreative();
  const verticalPosition = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
  } as const;
  return (
    <AbsoluteFill
      style={{
        top: metrics.contentTop,
        bottom: metrics.safeBottom + theme.spacing.lg,
        height: "auto",
        padding: `0 ${metrics.safeX}px`,
        justifyContent: verticalPosition[design.contentPosition],
        alignItems: "center",
        textAlign: design.textAlign,
        gap: theme.spacing.lg,
        transform: `translate(${design.contentOffsetX}px, ${design.contentOffsetY}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const BrandScene = ({ content }: { content: PromoContent }) => {
  const { theme, format, design } = useCreative();
  return (
    <Center>
      <ScaleIn>
        <CareMark size={format === "vertical" ? 180 : 110} />
      </ScaleIn>
      <div
        style={{
          maxWidth: format === "landscape" ? 1220 : theme.layout.maxCopyWidth,
        }}
      >
        <MaskReveal duration={0.75}>
          <DisplayText
            style={{
              fontSize:
                (format === "vertical" ? 132 : format === "square" ? 86 : 120) *
                design.typographyScale,
            }}
          >
            {content.copy.brandHeadline}
          </DisplayText>
        </MaskReveal>
      </div>
      <SlideIn delay={0.15}>
        <BodyText style={{ maxWidth: theme.layout.maxCopyWidth }}>
          {content.copy.brandSupporting}
        </BodyText>
      </SlideIn>
    </Center>
  );
};
const ServiceScene = ({ content }: { content: PromoContent }) => (
  <SceneLayout
    copy={
      <CopyBlock
        step="01 / Find your care"
        title={content.copy.serviceQuestion}
      >
        {content.service.description}
      </CopyBlock>
    }
    visual={
      <Parallax>
        <SpringReveal delay={0.08}>
          <ServiceCard service={content.service} />
        </SpringReveal>
      </Parallax>
    }
  />
);
const DoctorScene = ({ content }: { content: PromoContent }) => (
  <SceneLayout
    copy={
      <CopyBlock
        step="02 / Meet your doctor"
        title={content.copy.doctorHeadline}
      >
        {content.doctor.speciality}
        <br />
        {content.practice.name}
      </CopyBlock>
    }
    visual={
      <Parallax>
        <SpringReveal delay={0.08}>
          <DoctorCard
            content={content}
            asset={assetRegistry.optional(
              content.doctor.imageAssetId,
              "person",
            )}
          />
        </SpringReveal>
      </Parallax>
    }
  />
);
const AvailabilityScene = ({ content }: { content: PromoContent }) => {
  const { theme, unit } = useCreative();
  return (
    <SceneLayout
      copy={
        <CopyBlock
          step="03 / Choose your time"
          title={content.copy.availabilityHeadline}
        >
          {content.service.name}
          <br />
          {content.doctor.name}
        </CopyBlock>
      }
      visual={
        <SpringReveal delay={0.06}>
          <GlassCard style={{ padding: theme.spacing.md * unit }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing.sm * unit,
              }}
            >
              <Eyebrow>Appointment times</Eyebrow>
              <BodyText
                style={{ fontSize: theme.typography.size.label * unit }}
              >
                {content.availabilityLabel}
              </BodyText>
              <Stagger
                delay={0.16}
                style={{ display: "grid", gap: theme.spacing.xs * unit }}
              >
                {content.availability.map((time, index) => (
                  <AppointmentSlot
                    key={time}
                    time={time}
                    selected={index === 0}
                  />
                ))}
              </Stagger>
              <div
                style={{
                  fontSize: theme.typography.size.micro * unit,
                  color: theme.colors.muted,
                }}
              >
                {content.dataMode === "demo"
                  ? "Illustrative times · Not live availability"
                  : "Availability subject to confirmation"}
              </div>
            </div>
          </GlassCard>
        </SpringReveal>
      }
    />
  );
};
const BookingScene = ({ content }: { content: PromoContent }) => (
  <SceneLayout
    copy={
      <CopyBlock
        step="04 / Plan your visit"
        title={content.copy.bookingHeadline}
      >
        {content.copy.bookingSupporting}
      </CopyBlock>
    }
    visual={
      <SpringReveal delay={0.04}>
        <DeviceFrame content={content} />
      </SpringReveal>
    }
  />
);
const ConfirmationScene = ({ content }: { content: PromoContent }) => {
  const { theme, unit } = useCreative();
  return (
    <SceneLayout
      copy={
        <CopyBlock
          step="Made around you"
          title={content.copy.confirmationHeadline}
        >
          {content.copy.confirmationSupporting}
        </CopyBlock>
      }
      visual={
        <ScaleIn>
          <GlassCard
            style={{
              padding: theme.spacing.lg * unit,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: theme.spacing.md * unit,
              textAlign: "center",
            }}
          >
            <SpringReveal>
              <div
                style={{
                  width: 132 * unit,
                  height: 132 * unit,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: theme.colors.mint,
                }}
              >
                <svg
                  width={66 * unit}
                  height={66 * unit}
                  viewBox="0 0 60 60"
                  fill="none"
                  aria-label="Example request acknowledgement"
                >
                  <path
                    d="m12 30 12 12 25-25"
                    stroke={theme.colors.primary}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </SpringReveal>
            <div
              data-fit-text
              style={{
                fontFamily: theme.typography.display,
                fontSize: theme.typography.size.title * unit,
                lineHeight: theme.typography.lineHeight.heading,
              }}
            >
              <TypeReveal text={content.copy.confirmationLabel} />
            </div>
            <BodyText style={{ fontSize: theme.typography.size.label * unit }}>
              {content.service.name}
              <br />
              {content.availability[0]}
            </BodyText>
            <Eyebrow>Practice review follows</Eyebrow>
            <div
              style={{
                fontSize: theme.typography.size.micro * unit,
                color: theme.colors.muted,
              }}
            >
              Preview only · No appointment booked
            </div>
          </GlassCard>
        </ScaleIn>
      }
    />
  );
};
const CtaScene = ({ content }: { content: PromoContent }) => {
  const { theme, metrics, format, design } = useCreative();
  return (
    <AbsoluteFill
      style={{ background: design.backgroundColor, color: theme.colors.ink }}
    >
      <div
        style={{
          position: "absolute",
          width: metrics.width,
          height: metrics.width,
          left: metrics.width * 0.48,
          top: metrics.height * 0.1,
          borderRadius: "50%",
          border: `2px solid ${theme.colors.mint}`,
          opacity: theme.opacity.decorative,
        }}
      />
      <Center>
        <BrandLogo large />
        <DisplayText style={{ maxWidth: format === "landscape" ? 1400 : 900 }}>
          {content.cta.subtitle}
        </DisplayText>
        <CTA title={content.cta.title} />
        <BodyText
          style={{ color: theme.colors.muted, fontSize: metrics.body * 0.85 }}
        >
          {content.cta.destinationLabel}
        </BodyText>
      </Center>
    </AbsoluteFill>
  );
};

const scenes: Record<
  PromoSceneId,
  (props: { content: PromoContent }) => ReactNode
> = {
  brand: BrandScene,
  service: ServiceScene,
  doctor: DoctorScene,
  availability: AvailabilityScene,
  booking: BookingScene,
  confirmation: ConfirmationScene,
  cta: CtaScene,
};
export const PromoScene = ({
  id,
  content,
}: {
  id: PromoSceneId;
  content: PromoContent;
}) => {
  const Scene = scenes[id];
  return <Scene content={content} />;
};
