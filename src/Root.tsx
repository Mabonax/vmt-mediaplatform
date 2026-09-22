// Initial snapshots generated from data/demo.json by npm run sync:defaults.
// Studio can save per-format edits here. Sync is explicit because it replaces those edits.
import "./index.css";
import { Composition } from "remotion";
import {
  DrHealthServicePromo15,
  calculatePromoMetadata,
} from "./brands/dr-health/compositions/DrHealthServicePromo15";
import { servicePromoSchema } from "./engine/schemas/promo";

export const RemotionRoot = () => (
  <>
    <Composition
      id="DrHealthServicePromo15-Vertical"
      component={DrHealthServicePromo15}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
      schema={servicePromoSchema}
      defaultProps={{
        content: {
          schemaVersion: 1,
          dataMode: "demo",
          practice: {
            name: "Grace Doctor Clinic",
          },
          doctor: {
            name: "Dr Naledi Mokoena",
            speciality: "General Practitioner",
            imageAssetId: "doctor-demo-01",
          },
          service: {
            name: "General Consultation",
            description:
              "A little time for your health. A clearer path to care.",
          },
          availability: ["09:00", "11:30", "14:30"],
          availabilityLabel: "Example appointment times",
          cta: {
            title: "Book with Dr. Health",
            subtitle: "Healthcare when you need it.",
            destinationLabel: "Find your next moment of care",
          },
          copy: {
            brandHeadline: "Care that fits your day.",
            brandSupporting:
              "Your health. Your time. A simpler way to connect.",
            serviceQuestion: "What care do you need?",
            doctorHeadline: "A human connection.",
            availabilityHeadline: "Make time for you.",
            bookingHeadline: "One step closer to care.",
            bookingSupporting:
              "Choose a time. Review your visit. Take the next step.",
            confirmationHeadline: "More clarity. Less effort.",
            confirmationSupporting:
              "A simple journey from finding care to planning your visit.",
            bookingAction: "Request appointment",
            confirmationLabel: "Your visit, planned",
          },
        },
        design: {
          layout: "editorial",
          typographyStyle: "editorial",
          typographyScale: 1,
          motionStyle: "smooth",
          motionIntensity: 0.6,
          motionSpeed: 1,
          imageScale: 1,
          imageTreatment: "card",
          shapeStyle: "rings",
          shapeDensity: "balanced",
          visualDepth: "layered",
          background: "paper",
        },
      }}
      calculateMetadata={calculatePromoMetadata}
    />
    <Composition
      id="DrHealthServicePromo15-Square"
      component={DrHealthServicePromo15}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1080}
      schema={servicePromoSchema}
      defaultProps={{
        content: {
          schemaVersion: 1,
          dataMode: "demo",
          practice: {
            name: "Grace Doctor Clinic",
          },
          doctor: {
            name: "Dr Naledi Mokoena",
            speciality: "General Practitioner",
            imageAssetId: "doctor-demo-01",
          },
          service: {
            name: "General Consultation",
            description:
              "A little time for your health. A clearer path to care.",
          },
          availability: ["09:00", "11:30", "14:30"],
          availabilityLabel: "Example appointment times",
          cta: {
            title: "Book with Dr. Health",
            subtitle: "Healthcare when you need it.",
            destinationLabel: "Find your next moment of care",
          },
          copy: {
            brandHeadline: "Care that fits your day.",
            brandSupporting:
              "Your health. Your time. A simpler way to connect.",
            serviceQuestion: "What care do you need?",
            doctorHeadline: "A human connection.",
            availabilityHeadline: "Make time for you.",
            bookingHeadline: "One step closer to care.",
            bookingSupporting:
              "Choose a time. Review your visit. Take the next step.",
            confirmationHeadline: "More clarity. Less effort.",
            confirmationSupporting:
              "A simple journey from finding care to planning your visit.",
            bookingAction: "Request appointment",
            confirmationLabel: "Your visit, planned",
          },
        },
        design: {
          layout: "editorial",
          typographyStyle: "editorial",
          typographyScale: 1,
          motionStyle: "smooth",
          motionIntensity: 0.6,
          motionSpeed: 1,
          imageScale: 1,
          imageTreatment: "card",
          shapeStyle: "rings",
          shapeDensity: "balanced",
          visualDepth: "layered",
          background: "paper",
        },
      }}
      calculateMetadata={calculatePromoMetadata}
    />
    <Composition
      id="DrHealthServicePromo15-Landscape"
      component={DrHealthServicePromo15}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
      schema={servicePromoSchema}
      defaultProps={{
        content: {
          schemaVersion: 1,
          dataMode: "demo",
          practice: {
            name: "Grace Doctor Clinic",
          },
          doctor: {
            name: "Dr Naledi Mokoena",
            speciality: "General Practitioner",
            imageAssetId: "doctor-demo-01",
          },
          service: {
            name: "General Consultation",
            description:
              "A little time for your health. A clearer path to care.",
          },
          availability: ["09:00", "11:30", "14:30"],
          availabilityLabel: "Example appointment times",
          cta: {
            title: "Book with Dr. Health",
            subtitle: "Healthcare when you need it.",
            destinationLabel: "Find your next moment of care",
          },
          copy: {
            brandHeadline: "Care that fits your day.",
            brandSupporting:
              "Your health. Your time. A simpler way to connect.",
            serviceQuestion: "What care do you need?",
            doctorHeadline: "A human connection.",
            availabilityHeadline: "Make time for you.",
            bookingHeadline: "One step closer to care.",
            bookingSupporting:
              "Choose a time. Review your visit. Take the next step.",
            confirmationHeadline: "More clarity. Less effort.",
            confirmationSupporting:
              "A simple journey from finding care to planning your visit.",
            bookingAction: "Request appointment",
            confirmationLabel: "Your visit, planned",
          },
        },
        design: {
          layout: "editorial",
          typographyStyle: "editorial",
          typographyScale: 1,
          motionStyle: "smooth",
          motionIntensity: 0.6,
          motionSpeed: 1,
          imageScale: 1,
          imageTreatment: "card",
          shapeStyle: "rings",
          shapeDensity: "balanced",
          visualDepth: "layered",
          background: "paper",
        },
      }}
      calculateMetadata={calculatePromoMetadata}
    />
  </>
);
