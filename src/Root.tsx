// Initial snapshots generated from data/demo.json by npm run sync:defaults.
// Studio can save per-format edits here. Sync is explicit because it replaces those edits.
import "./index.css";
import { Composition, Folder } from "remotion";
import { GrammarPromo, calculateGrammarMetadata } from "./renderers/remotion/GrammarPromo";
import { grammarPromoSchema } from "./engine/grammar/models";
import {
  DrHealthServicePromo15,
  calculatePromoMetadata,
} from "./brands/dr-health/compositions/DrHealthServicePromo15";
import { servicePromoSchema } from "./engine/schemas/promo";

export const RemotionRoot = () => (
  <>
    <Folder name="Start-Here">
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
          schemaVersion: 1 as const,
          dataMode: "demo" as const,
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
            description: "Choose a service offered by your connected clinic.",
          },
          availability: ["09:00", "11:30", "14:30"],
          availabilityLabel: "Example appointment times",
          cta: {
            title: "Request an appointment",
            subtitle: "Your clinic. Your next appointment.",
            destinationLabel: "Choose a service and an available time",
          },
          copy: {
            brandHeadline: "Your next visit starts here.",
            brandSupporting: "Choose a service. Find a practitioner. Request a time.",
            serviceQuestion: "What care do you need?",
            doctorHeadline: "Choose your practitioner.",
            availabilityHeadline: "Find an available time.",
            bookingHeadline: "Review your request.",
            bookingSupporting: "Check your service, practitioner and time before sending.",
            confirmationHeadline: "Stay informed about your visit.",
            confirmationSupporting: "View appointments and request changes where available.",
            bookingAction: "Request appointment",
            confirmationLabel: "Awaiting confirmation",
          },
        },
        design: {
          logoVariant: "powered-by-gperp" as const,
          logoPosition: "left" as const,
          logoScale: 1,
          headingFont: "Montserrat" as const,
          bodyFont: "Poppins" as const,
          backgroundColor: "#FFFFFF",
          textColor: "#003F4B",
          primaryColor: "#005B6C",
          accentColor: "#10BA31",
          contentPosition: "center" as const,
          textAlign: "left" as const,
          contentOffsetX: 0,
          contentOffsetY: 0,
          layout: "editorial" as const,
          typographyStyle: "editorial" as const,
          typographyScale: 1,
          motionStyle: "smooth" as const,
          motionIntensity: 0.6,
          motionSpeed: 1,
          imageScale: 1,
          imageTreatment: "card" as const,
          shapeStyle: "rings" as const,
          shapeDensity: "balanced" as const,
          visualDepth: "layered" as const,
          background: "paper" as const,
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
              "Choose a service offered by your connected clinic.",
          },
          availability: ["09:00", "11:30", "14:30"],
          availabilityLabel: "Example appointment times",
          cta: {
            title: "Request an appointment",
            subtitle: "Your clinic. Your next appointment.",
            destinationLabel: "Choose a service and an available time",
          },
          copy: {
            brandHeadline: "Your next visit starts here.",
            brandSupporting:
              "Choose a service. Find a practitioner. Request a time.",
            serviceQuestion: "What care do you need?",
            doctorHeadline: "Choose your practitioner.",
            availabilityHeadline: "Find an available time.",
            bookingHeadline: "Review your request.",
            bookingSupporting:
              "Check your service, practitioner and time before sending.",
            confirmationHeadline: "Stay informed about your visit.",
            confirmationSupporting:
              "View appointments and request changes where available.",
            bookingAction: "Request appointment",
            confirmationLabel: "Awaiting confirmation",
          },
        },
        design: {
          logoVariant: "powered-by-gperp",
          logoPosition: "left",
          logoScale: 1,
          headingFont: "Montserrat",
          bodyFont: "Poppins",
          backgroundColor: "#FFFFFF",
          textColor: "#003F4B",
          primaryColor: "#005B6C",
          accentColor: "#10BA31",
          contentPosition: "center",
          textAlign: "left",
          contentOffsetX: 0,
          contentOffsetY: 0,
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
              "Choose a service offered by your connected clinic.",
          },
          availability: ["09:00", "11:30", "14:30"],
          availabilityLabel: "Example appointment times",
          cta: {
            title: "Request an appointment",
            subtitle: "Your clinic. Your next appointment.",
            destinationLabel: "Choose a service and an available time",
          },
          copy: {
            brandHeadline: "Your next visit starts here.",
            brandSupporting:
              "Choose a service. Find a practitioner. Request a time.",
            serviceQuestion: "What care do you need?",
            doctorHeadline: "Choose your practitioner.",
            availabilityHeadline: "Find an available time.",
            bookingHeadline: "Review your request.",
            bookingSupporting:
              "Check your service, practitioner and time before sending.",
            confirmationHeadline: "Stay informed about your visit.",
            confirmationSupporting:
              "View appointments and request changes where available.",
            bookingAction: "Request appointment",
            confirmationLabel: "Awaiting confirmation",
          },
        },
        design: {
          logoVariant: "powered-by-gperp",
          logoPosition: "left",
          logoScale: 1,
          headingFont: "Montserrat",
          bodyFont: "Poppins",
          backgroundColor: "#FFFFFF",
          textColor: "#003F4B",
          primaryColor: "#005B6C",
          accentColor: "#10BA31",
          contentPosition: "center",
          textAlign: "left",
          contentOffsetX: 0,
          contentOffsetY: 0,
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
    </Folder>
    {/* Grammar examples start: explicit sync only */}
    <Folder name="Design-Grammar">
      <Folder name="editorial-health">
        <Composition
          id="Grammar-editorial-health-split-subtle-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-split-subtle-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-split-subtle-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-split-premium-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-split-premium-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-split-premium-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-portrait-first-subtle-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-portrait-first-subtle-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-portrait-first-subtle-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-portrait-first-premium-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-portrait-first-premium-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-editorial-health-portrait-first-premium-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "editorial-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
      </Folder>
      <Folder name="minimal-clinical">
        <Composition
          id="Grammar-minimal-clinical-split-subtle-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-split-subtle-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-split-subtle-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-split-premium-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-split-premium-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-split-premium-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-portrait-first-subtle-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-portrait-first-subtle-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-portrait-first-subtle-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-portrait-first-premium-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-portrait-first-premium-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-minimal-clinical-portrait-first-premium-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "minimal-clinical",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
      </Folder>
      <Folder name="technology-health">
        <Composition
          id="Grammar-technology-health-split-subtle-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-split-subtle-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-split-subtle-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-split-premium-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-split-premium-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-split-premium-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "split",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-portrait-first-subtle-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-portrait-first-subtle-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-portrait-first-subtle-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "subtle",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-portrait-first-premium-Vertical"
          component={GrammarPromo}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-portrait-first-premium-Square"
          component={GrammarPromo}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
        <Composition
          id="Grammar-technology-health-portrait-first-premium-Landscape"
          component={GrammarPromo}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={180}
          schema={grammarPromoSchema}
          calculateMetadata={calculateGrammarMetadata}
          defaultProps={{
            schemaVersion: 1,
            familyId: "technology-health",
            variation: {
              layoutVariant: "portrait-first",
              typographyScale: 1,
              imageScale: 1,
              whitespace: 0.5,
              shapeDensity: 0.5,
              depth: 0.5,
              expressiveness: 0.5,
            },
            axes: {
              expressive: 0.5,
              friendly: 0.5,
              dimensional: 0.5,
              spacious: 0.5,
              dynamic: 0.5,
            },
            motionId: "premium",
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
                description: "Choose a service offered by your connected clinic.",
              },
              availability: ["09:00", "11:30", "14:30"],
              availabilityLabel: "Example appointment times",
              cta: {
                title: "Request an appointment",
                subtitle: "Your clinic. Your next appointment.",
                destinationLabel: "Choose a service and an available time",
              },
              copy: {
                brandHeadline: "Your next visit starts here.",
                brandSupporting:
                  "Choose a service. Find a practitioner. Request a time.",
                serviceQuestion: "What care do you need?",
                doctorHeadline: "Choose your practitioner.",
                availabilityHeadline: "Find an available time.",
                bookingHeadline: "Review your request.",
                bookingSupporting:
                  "Check your service, practitioner and time before sending.",
                confirmationHeadline: "Stay informed about your visit.",
                confirmationSupporting:
                  "View appointments and request changes where available.",
                bookingAction: "Request appointment",
                confirmationLabel: "Awaiting confirmation",
              },
            },
          }}
        />
      </Folder>
    </Folder>
    {/* Grammar examples end */}
  </>
);
